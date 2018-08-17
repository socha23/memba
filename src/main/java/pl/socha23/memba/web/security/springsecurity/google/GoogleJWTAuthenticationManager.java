package pl.socha23.memba.web.security.springsecurity.google;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.web.security.springsecurity.UserBasedAuthentication;

import java.util.Collections;

@Component
class GoogleJWTAuthenticationManager implements AuthenticationManager {

    private GoogleIdTokenVerifier verifier;

    public GoogleJWTAuthenticationManager(@Value("${memba.security.google.client_id}") String clientId) {
        verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singleton(clientId))
                .build();
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof PreAuthenticatedAuthenticationToken) {
            return authenticateToken("" + authentication.getPrincipal());
        } else {
            return authentication;
        }
    }

    private Authentication authenticateToken(String token) throws AuthenticationException {
        try {
            return doAuthenticateToken(token);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Authentication doAuthenticateToken(String token) throws Exception {
        var googleId = verifier.verify(token);
        if (googleId != null) {
            var auth =  new UserBasedAuthentication(new PayloadBasedUser(googleId.getPayload()));
            auth.setAuthenticated(true);
            return auth;
        }
        return null;
    }

    private static class PayloadBasedUser implements User {

        private GoogleIdToken.Payload payload;

        PayloadBasedUser(GoogleIdToken.Payload payload) {
            this.payload = payload;
        }

        @Override
        public String getId() {
            return payload.getEmail();
        }

        public String getFirstName() {
            return (String)payload.get("given_name");
        }

        public String getFullName() {
            return (String)payload.get("name");
        }

        public String getEmail() {
            return payload.getEmail();
        }

        public String getPictureUrl() {
            return (String)payload.get("picture");
        }
    }
}

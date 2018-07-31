package pl.socha23.memba.web.security;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import pl.socha23.memba.business.User;

import java.util.Map;

class GoogleOAuth2User implements User {
    
    private Map<String, Object> attributes;

    GoogleOAuth2User(OAuth2AuthenticationToken token) {
        attributes = token.getPrincipal().getAttributes();
    }

    @Override
    public String getId() {
        return getAttrAsString("email");
    }

    @Override
    public String getFirstName() {
        return getAttrAsString("given_name");
    }

    @Override
    public String getFullName() {
        return getAttrAsString("name");
    }

    @Override
    public String getEmail() {
        return getAttrAsString("email");
    }

    private String getAttrAsString(String name) {
        return attributes.get(name) + "";
    }

}

package pl.socha23.memba.web.security.spring;

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

class PreAuthenticatedTokenFilter extends AbstractPreAuthenticatedProcessingFilter {

    private final static String AUTH_HEADER = "Authorization";
    private final static String BEARER_TYPE = "Bearer";

    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        String token = extractHeaderToken(request);
        if (token != null) {
            return token;
        } else {
            return null;
        }
    }

    private String extractHeaderToken(HttpServletRequest request) {
        Enumeration<String> headers = request.getHeaders(AUTH_HEADER);
        while (headers.hasMoreElements()) { 
            String value = headers.nextElement();
            if ((value.toLowerCase().startsWith(BEARER_TYPE.toLowerCase()))) {
                String authHeaderValue = value.substring(BEARER_TYPE.length()).trim();
                int commaIndex = authHeaderValue.indexOf(',');
                if (commaIndex > 0) {
                    authHeaderValue = authHeaderValue.substring(0, commaIndex);
                }
                return authHeaderValue;
            }
        }
        return null;
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        if (getPreAuthenticatedPrincipal(request) != null) {
            return "UNKNOWN";
        } else {
            return null;
        }

    }
}

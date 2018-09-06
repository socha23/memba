package pl.socha23.memba.web;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.io.InputStream;
import java.security.MessageDigest;
import java.util.Base64;

@Controller
public class IndexController {

    private String googleClientId;

    public IndexController(@Value("${memba.security.google.client_id}") String googleClientId) {
        this.googleClientId = googleClientId;
    }

    private String calculateMd5(String path) {
        try {
            InputStream is = getClass().getClassLoader().getResourceAsStream(path);
            byte[] bytes = IOUtils.toByteArray(is);
            is.close();
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(bytes);
            return Base64.getEncoder().encodeToString(digest.digest());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @ModelAttribute("googleClientId")
    public String getGoogleClientId() {
        return googleClientId;
    }

    @ModelAttribute("membaCssCachebuster")
    public String getMembaCssCachebuster() {
        return calculateMd5("static/memba.css");
    }

    @ModelAttribute("bundleJsCachebuster")
    public String getBundleJsCachebuster() {
        return calculateMd5("static/bundle.js");
    }

}


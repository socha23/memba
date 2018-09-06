package pl.socha23.memba.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Random;

@Controller
public class IndexController {

    private Resource bundleJs = new ClassPathResource("classpath:/static/bundle.js");

    private String googleClientId;

    public IndexController(@Value("${memba.security.google.client_id}") String googleClientId) {
        this.googleClientId = googleClientId;
    }

    private String calculateMd5(String path) {
        try {
            URL resource = getClass().getClassLoader().getResource(path);
            byte[] bytes = Files.readAllBytes(Paths.get(resource.toURI()));
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


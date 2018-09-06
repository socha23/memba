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

    private Random random = new Random();
    private String googleClientId;

    private final String bundleJsMd5;

    public IndexController(@Value("${memba.security.google.client_id}") String googleClientId) {
        this.googleClientId = googleClientId;
        bundleJsMd5 = calculateBundleJsMd5();
    }

    private String calculateBundleJsMd5() {
        try {
            URL resource = getClass().getClassLoader().getResource("static/bundle.js");
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

    @ModelAttribute("cachebuster")
    public String getCachebuster() {
        return bundleJsMd5;
    }

}


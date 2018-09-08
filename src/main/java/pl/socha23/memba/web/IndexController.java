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
    private String gcmSenderId;

    private String vapidPublicKey;


    public IndexController(
            @Value("${memba.security.google.client_id}") String googleClientId,
            @Value("${memba.push.gcm_sender_id}") String gcmSenderId,
            @Value("${memba.push.vapidPublicKey}") String vapidPublicKey
    ) {
        this.googleClientId = googleClientId;
        this.gcmSenderId = gcmSenderId;
        this.vapidPublicKey = vapidPublicKey;
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
        return "index.html";
    }

    @GetMapping("/manifest.json")
    public String manifest() {
        return "manifest.json";
    }


    @ModelAttribute("googleClientId")
    public String getGoogleClientId() {
        return googleClientId;
    }

    @ModelAttribute("gcmSenderId")
    public String getGcmSenderId() {
        return gcmSenderId;
    }

    @ModelAttribute("vapidPublicKey")
    public String getVapidPublicKey() {
        return vapidPublicKey;
    }

    @ModelAttribute("membaCssCachebuster")
    public String getMembaCssCachebuster() {
        return calculateMd5("static/memba.css");
    }

    @ModelAttribute("bundleJsCachebuster")
    public String getBundleJsCachebuster() {
        return calculateMd5("static/app-bundle.js");
    }

    @ModelAttribute("serviceWorkerCachebuster")
    public String getServiceWorkerCachebuster() {
        return calculateMd5("static/serviceworker-bundle.js");
    }
}


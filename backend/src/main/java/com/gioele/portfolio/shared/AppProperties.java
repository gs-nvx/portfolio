package com.gioele.portfolio.shared;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Getter @Setter
public class AppProperties {

    private Jwt jwt = new Jwt();
    private Uploads uploads = new Uploads();
    private Mail mail = new Mail();

    @Getter @Setter
    public static class Jwt {
        private String secret;
        private long expirationMs;
    }

    @Getter @Setter
    public static class Uploads {
        private String path;
        private String baseUrl;
    }

    @Getter @Setter
    public static class Mail {
        private String from;
        private String to;
    }
}
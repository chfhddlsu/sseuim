package com.example.sseuim.common;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Component;

@Component
public class Common {

    public String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (!bearerToken.isEmpty()) {
            return bearerToken;
        }
        return null;
    }
}

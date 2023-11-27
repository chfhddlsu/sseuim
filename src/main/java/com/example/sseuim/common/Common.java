package com.example.sseuim.common;

import com.example.sseuim.jwt.TokenProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class Common {

    private final Key key;
    private final TokenProvider tokenProvider;

    public Common(@Value("${jwt.secret}") String secretKey, TokenProvider tokenProvider) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.tokenProvider = tokenProvider;
    }

    /**
    *  Header에서 사용자 토큰 얻기
    *
    * @param : HttpSevletRequest request
    * @return : String token
    */
    public String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (!bearerToken.isEmpty()) {
            return bearerToken;
        }
        return null;
    }


    /**
     *  token에서 사용자 Email값 Decode
     *
     * @param : String token
     * @return : String email
     */
    public String getEmailByToken(String token ) {

        String email = "";

        if(tokenProvider.validateToken(token)){
            email = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().get("email").toString();
        }

        return email;
    }

}

package com.example.sseuim.common;

import com.example.sseuim.jwt.TokenProvider;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.service.MemberServiceImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class Common {

    private final Key key;
    private final TokenProvider tokenProvider;
    private final MemberServiceImpl memberService;

    public Common(@Value("${jwt.secret}") String secretKey, TokenProvider tokenProvider,  MemberServiceImpl memberService) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.tokenProvider = tokenProvider;
        this.memberService = memberService;
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

    /**
     *  사용자 email로 사용자 조회
     *
     * @param : ServletRequest request
     * @return : Member member
     */
/*    public Member getMemberInfo(ServletRequest request){
        String token = getToken((HttpServletRequest) request);
        String email =  getEmailByToken(token);

        Member member = memberService.findMemberByEmail(email);

        return member;
    }*/

}

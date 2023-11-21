package com.example.sseuim.member.controller;

import com.example.sseuim.jwt.entity.JwtToken;
import com.example.sseuim.member.domain.MemberRequestVo;
import com.example.sseuim.member.domain.MemberResponseVo;
import com.example.sseuim.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("join")
    public ResponseEntity<MemberResponseVo> saveMember(@RequestBody MemberRequestVo requestVo){

        return ResponseEntity.ok(authService.signup(requestVo));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody MemberRequestVo requestVo){
        return ResponseEntity.ok(authService.login(requestVo));
    }
}

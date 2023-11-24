package com.example.sseuim.member.controller;

import com.example.sseuim.member.domain.MemberResponseVo;
import com.example.sseuim.member.service.AuthService;
import com.example.sseuim.member.service.MemberService;
import com.example.sseuim.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberServiceImpl service;
    private final AuthService authService;
    private final MemberService memberService;

    private final Logger log = LoggerFactory.getLogger(getClass());
    @PostMapping("/me")
    public ResponseEntity<MemberResponseVo> getMyMemberInfo(){
        MemberResponseVo myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
    }



}

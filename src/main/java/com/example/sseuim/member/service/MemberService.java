package com.example.sseuim.member.service;

import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.domain.MemberResponseVo;

public interface MemberService {
    public MemberResponseVo getMyInfoBySecurity();

    public Member findMemberByEmail(String email);

}

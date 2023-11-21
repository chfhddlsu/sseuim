package com.example.sseuim.member.service;

import com.example.sseuim.member.domain.MemberResponseVo;

public interface MemberService {

    int getIdDuple(String id);
    public MemberResponseVo getMyInfoBySecurity();

}

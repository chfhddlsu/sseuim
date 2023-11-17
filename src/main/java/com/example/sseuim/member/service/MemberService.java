package com.example.sseuim.member.service;

import com.example.sseuim.member.domain.MemberVo;

public interface MemberService {

    int saveMember(MemberVo vo);

    int getIdDuple(String id);
}

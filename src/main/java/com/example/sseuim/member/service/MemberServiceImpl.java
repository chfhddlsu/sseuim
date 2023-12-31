package com.example.sseuim.member.service;


import com.example.sseuim.jwt.config.SecurityUtil;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.domain.MemberResponseVo;
import com.example.sseuim.member.mapper.MemberMapper;
import com.example.sseuim.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberMapper mapper;
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberMapper mapper,MemberRepository memberRepository){
        this.mapper= mapper;
        this.memberRepository = memberRepository;
    }


    @Override
    public MemberResponseVo getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseVo::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Override
    public Member findMemberByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member member = optionalMember.orElseThrow(() -> new UsernameNotFoundException("사용자 정보가 없습니다. "));

        return member;
    }



}

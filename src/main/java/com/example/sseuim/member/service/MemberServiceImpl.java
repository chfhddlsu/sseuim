package com.example.sseuim.member.service;


import com.example.sseuim.member.domain.MemberVo;
import com.example.sseuim.member.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberMapper mapper;
    @Autowired
    public MemberServiceImpl(MemberMapper mapper){
        this.mapper= mapper;
    }

    @Override
    public int saveMember(MemberVo vo){
        int result = 0;

        if(vo.getNickname() == ""){
            vo.setNickname(vo.getId());
        }
        result = mapper.saveMember(vo);

        return result;
    }

    @Override
    public int getIsDuple(String id){


        return mapper.getIsDuple(id);
    }
}

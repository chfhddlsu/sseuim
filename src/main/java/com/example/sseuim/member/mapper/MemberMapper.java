package com.example.sseuim.member.mapper;

import com.example.sseuim.member.domain.MemberVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MemberMapper {

    int saveMember(MemberVo vo);

    int getIsDuple(String id);
}

package com.example.sseuim.member.mapper;

import com.example.sseuim.jwt.TokenVo;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.domain.MemberVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Mapper
public interface MemberMapper {

    int saveMember(MemberVo vo);

    int getIdDuple(String id);
}

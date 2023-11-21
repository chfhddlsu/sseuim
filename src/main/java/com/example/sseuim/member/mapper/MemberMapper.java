package com.example.sseuim.member.mapper;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {

    int getIdDuple(String id);

}

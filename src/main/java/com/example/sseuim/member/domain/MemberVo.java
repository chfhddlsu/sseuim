package com.example.sseuim.member.domain;

import lombok.Data;

@Data
public class MemberVo {
    private String id;
    private String pwd;
    private String name;
    private String nickname;
    private String birth;
    private String email;
    private String gender;
    private String reg_date;
    private String use_yn;

}

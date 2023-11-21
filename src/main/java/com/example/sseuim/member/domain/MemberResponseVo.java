package com.example.sseuim.member.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseVo {
    private String email;
    private String nickname;

    public static MemberResponseVo of(Member member) {
        return MemberResponseVo.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build();
    }

}

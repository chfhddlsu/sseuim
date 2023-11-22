package com.example.sseuim.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Getter
@Builder
@Entity
@NoArgsConstructor
public class Member {

        @jakarta.persistence.Id
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(nullable = false)
        private String email;

        @Column(nullable = false)
        private String password;

        @Column(nullable = false)
        private String name;

        @Column(nullable = false)
        private String nickname;

        @Column(nullable = false)
        private String birth;

        @Enumerated(EnumType.STRING)
        private Authority authority;

        public void setNickname(String nickname) {

                this.nickname = nickname;
        }


        public void setPassword(String password) { this.password = password; }

        @Builder
        public Member(Long id, String email, String password, String name, String nickname ,String birth, Authority authority) {
                this.id = id;
                this.email = email;
                this.password = password;
                this.name = name;
                this.nickname = nickname;
                this.birth = birth;
                this.authority = authority;
        }


        public void setId(Long id) {
                this.id = id;
        }

        public Long getId() {
                return id;
        }
}



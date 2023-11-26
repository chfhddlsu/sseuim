package com.example.sseuim.book.service;

import com.example.sseuim.book.domain.BookVo;
import com.example.sseuim.book.mapper.BookMapper;
import com.example.sseuim.jwt.TokenProvider;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.service.MemberService;
import com.example.sseuim.member.service.MemberServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BookServiceImpl implements BookService{

    private final BookMapper bookMapper;
    private final MemberServiceImpl memberService;

    private final TokenProvider tokenProvider;

    BookServiceImpl(BookMapper bookMapper, MemberServiceImpl memberService, TokenProvider tokenProvider){

        this.bookMapper = bookMapper;
        this.memberService = memberService;
        this.tokenProvider = tokenProvider;

    }

    @Override
    public int saveBook(BookVo vo , String token){

        String email = tokenProvider.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);

        int result = 0;

        return result;
    }



}

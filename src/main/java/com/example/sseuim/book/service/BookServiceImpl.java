package com.example.sseuim.book.service;

import com.example.sseuim.book.domain.BookVo;
import com.example.sseuim.book.mapper.BookMapper;
import com.example.sseuim.common.Common;
import com.example.sseuim.jwt.TokenProvider;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.service.MemberService;
import com.example.sseuim.member.service.MemberServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@Transactional
public class BookServiceImpl implements BookService{

    private final BookMapper bookMapper;
    private final MemberServiceImpl memberService;
    private final Common common;

    BookServiceImpl(BookMapper bookMapper, MemberServiceImpl memberService, Common common){

        this.bookMapper = bookMapper;
        this.memberService = memberService;
        this.common = common;
    }


    /**
     *  사용자의 도서정보와 상태 저장
     *
     * @param : BookVo vo, String token
     * @return :  BookVo vo
     */
    @Override
    @Transactional
    public BookVo saveBook(BookVo vo , String token) {

        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        BookVo response = new BookVo();
        int result = 0;

        vo.setUserId(member.getId());

       result += bookMapper.saveMyBook(vo);      // 사용자 상태 저장
       result += bookMapper.saveBookDetail(vo);  // 책 상세 정보 저장

       if(result > 0){
           response = getUserStatus(vo);
       }

       return response;
    }



    /**
     *  사용자의 도서 상태를 조회
     *
     * @param : String token, String userId
     * @return :  BookVo vo
     */
    public BookVo getUserStatus(BookVo vo){

        vo = bookMapper.getUserStatus(vo);

        return vo;
    }
}

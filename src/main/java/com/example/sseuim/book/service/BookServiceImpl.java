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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
    public int saveBook(BookVo vo , String token) {

        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        LocalDate today = LocalDate.now();
        int result = 0;

        vo.setUserId(member.getId());

        if(vo.getStatus().equals("READING")){
            vo.setStartDate(String.valueOf(today));
        }
        if(vo.getStatus().equals("DONE")){
            vo.setEndDate(String.valueOf(today));
        }

       result += bookMapper.saveMyBook(vo);      // 사용자 상태 저장

        int newIs = 0;
        newIs = bookMapper.getDetailBookYn(vo);
        if(newIs == 0){
            bookMapper.saveBookDetail(vo);  // 책 상세 정보 저장
        }


       return result;
    }


    /**
     *  사용자의 도서 상태를 조회
     *
     * @param :  BookVo vo
     * @return :  BookVo vo
     */
    @Override
    public BookVo getUserStatus(BookVo vo){

        vo = bookMapper.getUserStatus(vo);

        return vo;
    }


    /**
     *  사용자의 도서 상태 정보 삭제
     *
     * @param : BookVo vo
     * @return :  int result
     */
    @Override
    @Transactional
    public int deleteBook(BookVo vo, String token){
        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        vo.setUserId(member.getId());

        int result = 0;

        result += bookMapper.deleteBookDetail(vo);
        result += bookMapper.deleteBook(vo);


        return result;
    }


    /**
     *  사용자 도서 별점 저장
     *
     * @param : BookVo vo
     * @return :  int result
     */
    @Override
    @Transactional
    public int saveScore(BookVo vo, String token){
        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        vo.setUserId(member.getId());

        int result = 0;

        result = bookMapper.saveScore(vo);

        return result;
    }

    /**
     *  읽고있는 책 조회
     *
     * @param : String token
     * @return :  BookVo Bookvo
     */
    @Override
    public ArrayList<BookVo> getReadingBook(String token){
        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        ArrayList<BookVo> book =  bookMapper.getReadingBook(member.getId());
        return book;

    }
}

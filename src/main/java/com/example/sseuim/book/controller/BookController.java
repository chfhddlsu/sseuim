package com.example.sseuim.book.controller;

import com.example.sseuim.book.domain.BookVo;
import com.example.sseuim.book.service.BookServiceImpl;
import com.example.sseuim.common.Common;
import com.example.sseuim.member.domain.Member;
import com.example.sseuim.member.service.MemberServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/book")
public class BookController {

    private final BookServiceImpl service;
    private final Common common;

    private final MemberServiceImpl memberService;

    BookController(BookServiceImpl service, Common common, MemberServiceImpl memberService){
        this.service = service;
        this.common = common;
        this.memberService = memberService;

    }
    @PostMapping("/saveBook")
    public int saveBook(@RequestBody BookVo vo, HttpServletRequest request){

        String token = common.getToken(request);

        return service.saveBook(vo, token);

    }

    @PostMapping("/deleteBook")
    public int deleteBook(@RequestBody BookVo vo, HttpServletRequest request){

        String token = common.getToken(request);


        return service.deleteBook(vo, token);

    }

    @PostMapping("/getBookStatus")
    public BookVo getBook(@RequestBody BookVo vo, HttpServletRequest request){
        String token = common.getToken(request);
        String email = common.getEmailByToken(token);
        Member member = memberService.findMemberByEmail(email);
        vo.setUserId(member.getId());


        return service.getUserStatus(vo);

    }

    @PostMapping("/saveScore")
    public int saveScore(@RequestBody BookVo vo, HttpServletRequest request){
        String token = common.getToken(request);

        return service.saveScore(vo, token);

    }

    @GetMapping("/getReadingBook")
    public  ArrayList<BookVo>  getReadingBook(HttpServletRequest request){
        String token = common.getToken(request);

        return   service.getReadingBook(token);
    }

    @PostMapping("/getMyRecord")
    public BookVo getMyLibrary(@RequestBody BookVo vo, HttpServletRequest request){
        String token = common.getToken(request);

        return service.getMyLibrary(vo, token);

    }


}

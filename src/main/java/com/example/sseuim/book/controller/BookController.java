package com.example.sseuim.book.controller;

import com.example.sseuim.book.domain.BookVo;
import com.example.sseuim.book.service.BookServiceImpl;
import com.example.sseuim.common.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/book")
public class BookController {

    private final BookServiceImpl service;
    private final Common common;

    BookController(BookServiceImpl service, Common common){
        this.service = service;
        this.common = common;
    }
    @PostMapping("/saveBook")
    public BookVo saveBook(@RequestBody BookVo vo, HttpServletRequest request){

        String token = common.getToken(request);

        return service.saveBook(vo, token);

    }

}

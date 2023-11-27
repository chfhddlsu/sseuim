package com.example.sseuim.book.service;

import com.example.sseuim.book.domain.BookVo;

public interface BookService {
    public BookVo saveBook(BookVo vo , String token);

    public BookVo getUserStatus(BookVo vo);
}

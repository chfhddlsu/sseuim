package com.example.sseuim.book.service;

import com.example.sseuim.book.domain.BookVo;

public interface BookService {
    public int saveBook(BookVo vo , String token);
}

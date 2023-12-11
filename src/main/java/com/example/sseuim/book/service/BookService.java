package com.example.sseuim.book.service;

import com.example.sseuim.book.domain.BookVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface BookService {
    public int saveBook(BookVo vo , String token);

    public BookVo getUserStatus(BookVo vo);

    public int  deleteBook(BookVo vo, String token);

    public int saveScore(BookVo vo, String token);

    public ArrayList<BookVo> getReadingBook(String token);
}

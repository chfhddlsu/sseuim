package com.example.sseuim.book.mapper;

import com.example.sseuim.book.domain.BookVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface BookMapper {

    int saveMyBook(BookVo vo);

    int saveBookDetail(BookVo vo);

    BookVo  getUserStatus(BookVo vo);

    int deleteBook(BookVo vo);

    int deleteBookDetail(BookVo vo);

    int getDetailBookYn(BookVo vo);

    int saveScore(BookVo vo);

   ArrayList<BookVo> getReadingBook(Long userId);
}

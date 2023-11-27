package com.example.sseuim.book.domain;

import lombok.Data;

@Data
public class BookVo {
    private String isbn13;
    private Long userId;
    private String title;
    private String author;
    private String cover;
    private String pubDate;
    private String description;
    private int priceStandard;
    private String categoryName;
    private String publisher;
    private String itemPage;
    private String status;
    private String score;
    private String startDate;
    private String endDate;
}

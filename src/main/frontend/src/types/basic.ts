
export interface Member {

    email     : string;
    password  : string;
    rePwd?    : string;
    name?     : string;
    nickname? : string;
    birth?    : string;

}

export interface Books {
    title  : string;
    author : string;
    isbn13 : string;
    cover  : string;
    publisher : string;
}

export interface BookDetail {
    title         : string,
    author        : string,
    cover         : string;
    pubDate       : string,
    description   : string,
    isbn13        : string,
    priceStandard : number,
    categoryName  : string,
    publisher     : string,
    itemPage      : string,
}

export interface ResponseBookInfo {
    title         : string,
    author        : string,
    cover         : string;
    pubDate       : string,
    description   : string,
    isbn13        : string,
    price_standard : number,
    category_name  : string,
    publisher     : string,
    itemPage      : string,
    status       : string,
    score         : number,
    memo?         : Memo[],
    memoCount?    : number
}


export interface Memo {
    memoId  : number;
    content : string;
    regDate : string;
    modiDate : string;
}

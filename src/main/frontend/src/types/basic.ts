
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
}
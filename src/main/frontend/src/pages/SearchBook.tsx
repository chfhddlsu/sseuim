import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import BookCover from "../component/BookCover";
import {useLocation} from "react-router-dom";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDispatch, useSelector}  from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {AppDispatch, RootState} from "../stores/store";
import {getBookDetail} from "../stores/book/bookSlice";
import {BookDetail, Books} from "../types/basic";
import StatusModal from '../component/StatusModal'
import BookRecord from "./BookRecord";

function SearchBook() :JSX.Element{
    const bookInit = {
        title : '',
        author        : '',
        cover         : '',
        pubDate       : '',
        description   : '',
        isbn13        : '',  // bookId
        priceStandard : 0,
        categoryName  : '',
        publisher     : '',
        itemPage      : '',
        status        : '',
        score         : 0,
        memo          : [],
        memoCount     : 0
    };

    const bookDetail= useSelector((state :RootState)=> state.book.bookDetail)
    const [book , setBook] = useState<BookDetail>(bookInit);
    const [star, setStar] = useState<number>(bookDetail.score);
    let [tab, setTab]= useState(2);
    const {state} = useLocation();
    const dispatch = useDispatch<AppDispatch>();



    const getBook = async () => {
        const URL = process.env.REACT_APP_ITEM_KEY

        try{
            const {data} = await  axios.get(URL + state.bookId);

            setBook(data.item[0]);
        }catch (e :any){
            console.log(e.message());
        }

    }
    useEffect(()=>{
       // dispatch(getBookDetail(state.bookId));
        getBook()

    },[dispatch, state])


    return (
        <>
            <Layout>
                <BookContent>
                    <BookCover src={book.cover} width='125px'/>
                    <BookContentKeyword>
                        <div style={{fontSize: '30px'}}> {book.title} </div>
                        <div> {book.author} </div>
                        <div> {book.publisher} </div>
                    </BookContentKeyword>
                </BookContent>
            </Layout>


            <Nav variant="tabs" defaultActiveKey="bookHistory">
                <Nav.Item>
                    <Nav.Link eventKey="info" onClick={() => { setTab(1) }}>기본정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="bookHistory" onClick={() => { setTab(2) }}>책 기록</Nav.Link>
                </Nav.Item>
            </Nav>



            { tab === 2 ?  <BookRecord star={star} setStar={setStar}/> : <BookInfo info={book}/>}

        </>
    )
}

function BookInfo(props : {info :BookDetail} ) : JSX.Element {

   const {author, publisher, categoryName, pubDate, priceStandard, description} = props.info

    return (
        <>
            <Layout>
                <span style={{fontSize: '25px'}}> 기본정보 </span>
                <span>저자     : {author} </span>
                <span>출판사   : {publisher} </span>
                <span>카테고리 : {categoryName} </span>
                <span>출간일   : {pubDate} </span>
                <span>정가     : {priceStandard} </span>
                <span>도서정보 : 알라딘 제공 </span>
                <span style={{fontSize: '25px'}} > 책설명 </span>
                <span> {description} </span>
            </Layout>
        </>
    )
}

const Layout = styled.div`
  margin: 0.9rem 0.75rem 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  background-color: #e8e7dd;
  min-width: 355px;
  font-family: 'omyu_pretty';
  
  span{
    margin-left: 10px;
    padding : 5px;
  }
  
`;

const BookContentKeyword = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  margin-left: 1rem;
  font-family: 'omyu_pretty'
`;

const BookContent = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;

  .noResults {
    margin-left: 1rem;
  }
`;



export default SearchBook;
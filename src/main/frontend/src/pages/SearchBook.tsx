import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import BookCover from "../component/BookCover";
import {useLocation} from "react-router-dom";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector}  from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import StarRating from "../component/StarRating";
import { CiMemoPad } from 'react-icons/ci';
import {getBookDetail} from "../stores/book/bookSlice";
import {BookDetail, Books} from "../types/basic";


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
    }
    const [book , setBook] = useState<BookDetail>(bookInit);
    const {state} = useLocation();
    let [tab, setTab]= useState(2);
    const dispatch = useDispatch();
  //  const bookDetail= useSelector((state)=> state.book.bookDetail)
   // const [star, setStar] = useState(bookDetail.score);

        console.log("dd", state.bookId);
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

    const selectList = [
        { value : '' , text : '선택' },
        { value : 'WISH', text : '읽고싶은'},
        { value : 'READING', text : '읽고있는'},
        { value : 'DONE', text : '다 읽은'}
    ]

    return (
        <>
            <Layout>
                <BookContent>
                    <BookCover src={book.cover} width='125px'/>
                    <BookContentKeyword>
                        <div style={{fontSize: '30px'}}> {book.title} </div>
                        <div> {book.author} </div>
                        <div> {book.publisher} </div>
                        <AddBtn>➕ 책 추가</AddBtn>
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


            { tab === 2 ? null : <BookInfo info={book}/>}
           {/* { tab === 2 ?  <BookHistory selectList={selectList}  item={bookDetail} star={star} setStar={setStar}/> : <SearchBook book={book}/>}*/}

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

/*
function BookHistory(props){
    const book = props.item
    console.log("dd", props.star)
    return(
        <>
            <Layout>
                <BookStateBox>
                    <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>내 상태</label>

                    <select id='bookStatus' value={book.status} >
                        {props.selectList.map((item, idx) => (
                            <option value={item.value} key={idx}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                </BookStateBox>

                <BookStateBox >
                    <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>별점</label>
                    <StarRating star={props.star} setStar={props.setStar}></StarRating>
                </BookStateBox>

                <BookStateBox>
                    <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>내 메모</label>
                    <IconBox>
                        <li>
                            <Memo/>
                            <div className='IconSpan'>0</div>
                        </li>

                    </IconBox>
                </BookStateBox>

            </Layout>

        </>
    );
    }
*/




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
const AddBtn = styled.button`
  background-color: #9ba986;
  padding: 0.5rem 0.75rem;
  border: 0.063rem solid var(--clear-day);
  border-radius: 0.25rem;
  width: 25%;
  margin-bottom: 0.7rem;
  margin-top: 1rem;
  color: black;
  font-family: 'omyu_pretty';

  &:hover {
    cursor: pointer;
  }
`
const BookStateBox = styled.div`
  flex-direction: column; 
  display: flex;
  margin-left: 1rem;
  margin-bottom: 2rem;
  font-family: 'omyu_pretty';
  select {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 0.063rem solid var(--clear-day);
    border-radius: 0.25rem;
    background-color: ${(props) => props.color || '#9ba986'};
    font-family: 'omyu_pretty';
    width: 200px;
  }
`;

const Memo = styled(CiMemoPad)`
  display:block;
  position:relative;

  &:hover {
    transform: translate(-0.1rem);
    cursor: pointer;
  }
  font-size: 1.5rem;
`

const IconBox = styled.ul`
  
  li{
    display: inline-block;
    position: relative;

    .IconSpan{
      position:absolute;
      left:50%;  line-height:1.462em; transform:translate(-50%, 0)
    }
  }
`

export default SearchBook;
import styled from 'styled-components';
import { CiMemoPad } from 'react-icons/ci';
import StarRating from "../component/StarRating";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import StatusModal from "../component/StatusModal";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../stores/store";
import {getBookDetail} from "../stores/book/bookSlice";
import {init} from "../stores/book/bookSlice";

type Type = {
    bookId : string
}

function BookRecord(bookId :Type) :JSX.Element{
    const bookInfo= useSelector((state :RootState)=> state.book.bookResponse)
    const [show, setShow] = useState(false);
    const [star, setStar] = useState<number>(bookInfo.score);
    const [status, setStatus] = useState<string>(bookInfo.status);
    const dispatch = useDispatch<AppDispatch>();
    const statusList = [
        { value : 'WISH',       text : '읽고싶은 📘'},
        { value : 'READING',    text : '읽고있는 📖'},
        { value : 'DONE',       text : '다 읽은 📕'},
        { value : 'STOP',       text : '멈춤 🚫'},
    ]

    function getUserBook(){
           dispatch(getBookDetail(bookId.bookId));
    }

    useEffect(()=>{
        dispatch(init());
        getUserBook();
    },[status,star,show])

    return (
        <Layout>
            <BookStateBox>
                <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>내 상태</label>
                <AddBtn onClick={()=>{setShow(true)}}>
                    {bookInfo.status === undefined ? "➕ 책 추가" :
                        statusList.map((val, idx)=>{
                            return (
                                bookInfo.status === val.value ? val.text : ""
                            )
                        })
                    }
                </AddBtn>
                <StatusModal show={show} setShow={setShow} bookId={bookId.bookId} ></StatusModal>
            </BookStateBox>

            {
                bookInfo.status === undefined ? null :

                    <BookStateBox >
                        <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>별점</label>
                        <StarRating star={bookInfo.score} setStar={setStar}></StarRating>
                    </BookStateBox>
            }

            {
                bookInfo.status === undefined ? null :

                    <BookStateBox>
                        <label htmlFor='bookStatus'  style={{fontSize: '20px'}}>내 메모</label>
                        <IconBox>
                            <li>
                                <Memo/>
                                <div className='IconSpan'>0</div>
                            </li>

                        </IconBox>
                    </BookStateBox>
            }

        </Layout>
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

export default BookRecord;
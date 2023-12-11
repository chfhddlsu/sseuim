import { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../stores/store";
import {deleteBook, saveBook} from "../stores/book/bookSlice";
import React from 'react';
import axios from "axios";
import {BookDetail, ResponseBookInfo} from "../types/basic";
import {ToastContainer} from "react-toastify";


type Modal ={
    show : boolean
    setShow : Function
    bookId :string
}
function StatusModal({show, setShow, bookId} : Modal) {
    const bookInit = {
        title : '',
        author        : '',
        cover         : '',
        pubDate       : '',
        description   : '',
        isbn13        : '',  // bookId
        price_standard : 0,
        category_name  : '',
        publisher     : '',
        itemPage      : '',
        status        : '',
        score         : 0,
    };

    const bookInfo= useSelector((state :RootState)=> state.book.bookResponse)
    const [check, setCheck] = useState ([false, false, false, false])
    const statusList = [
        { value : 'WISH',       text : '읽고싶은 📘'},
        { value : 'READING',    text : '읽고있는 📖'},
        { value : 'DONE',       text : '다 읽은 📕'},
        { value : 'STOP',       text : '멈춤 🚫'},
    ]
    const {isSuccess}  = useSelector((state:RootState) => state.book);
    const handleClose = () => setShow(false);
    const dispatch = useDispatch<AppDispatch>();
    const [book , setBook] = useState<ResponseBookInfo>(bookInit);
    const getBookDate = async ()=>{
        const URL = process.env.REACT_APP_ITEM_KEY

        try{
            const {data} = await  axios.get(URL + bookId);

            setBook(data.item[0]);
        }catch (e :any){
            console.log(e);
        }
    }

    useEffect(()=>{

        getBookDate();
        fn_setCheck(bookInfo.status);

    },[bookInfo.status])

    function fn_setCheck(value:string){

        let copy = [...check];

        for(let i=0; i<statusList.length; i++){

            if(value == statusList[i].value){
                copy[i] = true
            }else{
                copy[i] = false
            }
        }

        setCheck(copy);
    }

    function OnClickStatus (idx :number, val :string)  {

        fn_setCheck(val);


        book.status = val;

        setBook(book)

        dispatch(saveBook(book));

    }

    function OnClickDelete(){

        dispatch(deleteBook(bookInfo));

    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>독서 상태</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   <ListBox>
                       {
                           statusList.map((item, idx)=>{
                               return(
                                   <StatusItem
                                       id={item.value} key={idx}
                                       onClick={()=>{OnClickStatus(idx, item.value)}}

                                   >
                                   {check[idx] === false ? null : <span><FaCheck/></span>}
                                   {item.text}
                                   </StatusItem>
                               )
                            })
                       }
                   </ListBox>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" style={{marginRight:'20rem', width:'4rem'}} onClick={OnClickDelete}>
                    <FaTrash/>
                </Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
            <ToastContainer/>
        </Modal>

    );
}

const ListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const StatusItem = styled.li`
  border: 1px solid #9ba986;
  position: relative;
  margin-top: 1.5px; /* Prevent double borders */
  background-color: #e8e7dd;
  padding: 12px;
  border-radius:  1.25rem;
  text-align: center;
  font-family: 'omyu_pretty';
  
  &:hover {
    transform: translate(-0.1rem);
    cursor: pointer;
  }
  
  span{
    color: #9ba986;
    padding-right: 0.5rem;
  }
  
`

export default StatusModal;
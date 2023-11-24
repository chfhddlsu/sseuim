import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

type Modal ={
    show : boolean
    setShow : Function
}
function StatusModal(props :Modal) {
    const [check, setCheck] = useState ([false, false, false, false])
    const statusList = [
        { value : 'WISH',       text : '읽고싶은 📘'},
        { value : 'READING',    text : '읽고있는 📖'},
        { value : 'DONE',       text : '다 읽은 📕'},
        { value : 'STOP',       text : '멈춤 🚫'},
    ]
    const handleClose = () => props.setShow(false);


    function OnClickHandler (idx :number, val :string)  {

        let copy = [...check];

        copy[idx] = !copy[idx]

        for(let i=0; i<statusList.length; i++){
            if(i != idx){
                copy[i] = false
            }
        }

        setCheck(copy);
    }

    return (

        <Modal show={props.show} onHide={handleClose}>
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
                                       onClick={()=>{OnClickHandler(idx, item.value)}}

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
                <Button variant="danger" style={{marginRight:'20rem', width:'4rem'}} onClick={handleClose}>
                    <FaTrash/>
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
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
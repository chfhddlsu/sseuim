
import React, {useState} from "react";
import styled from 'styled-components';
import { FaBook } from "react-icons/fa6";
import { CiMemoPad } from "react-icons/ci";
import {BookSlide} from "../component/BookSlide";
import BookCover from "../component/BookCover";
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";
import {Books} from "../types/basic";
import {useNavigate} from "react-router-dom";

function  Library ():React.ReactElement {

    const { token } = useSelector((state: RootState) => state.member);
    const [myBook, setMyBook] = useState<Books[]>([]);
    const navigate = useNavigate();
    
    return (
            <Layout>
                <Card>
                    <span>기록</span>
                    <Container>
                        <li>
                            <FaBook size='1.5rem' />
                            <div>책[0]</div>
                        </li>
                        <li>
                            <CiMemoPad size='1.5rem' />
                            <div>메모[0]</div>
                        </li>
                    </Container>
                </Card>

                <Card>
                    <span>읽고 있는 책</span>
                    <BookSlide>
                        {
                            myBook.map((item,idx)=>{
                                return(
                                    <Container
                                        key={idx}
                                        onClick={()=>{navigate('/detail', {state : {bookId : item.isbn13}})}}
                                    >
                                        <BookCover src={item.cover} width=""/>
                                    </Container>
                                )
                            })
                        }
                    </BookSlide>
                </Card>

                <Card>

                </Card>
            </Layout>


    )
}

const Layout = styled.div`
  width: 100%;
  float: left;
  margin-bottom: 16px;
  padding : 0 8px;
  font-family: 'omyu_pretty';

  
`

const Card = styled.div`
  border-radius: 0.3rem;
  margin: 8px;
  height: 50%;
  border: 0.07rem solid #91988a;
  span {
    font-size: 22px;
    font-weight: 600;
    margin-left: 1rem;
    margin-top: 1rem;
  }
`
const Container  = styled.ul`
  list-style: none;
  display: flex;
  margin : 0;
  padding-left : 2px;
  li{
    margin: 0rem 0rem 0rem 2rem;
    &:hover {
      transform: translate(-0.1rem);
      cursor: pointer;
    }   
  }
`




export default Library;
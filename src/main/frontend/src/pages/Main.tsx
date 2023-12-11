import styled from 'styled-components';
import BookCover from "../component/BookCover";
import React, {useEffect, useState} from "react";
import {BookSlide} from "../component/BookSlide";
import axios from "axios";
import {Books} from "../types/basic";
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

function Main(){
    const { token } = useSelector((state: RootState) => state.member);
    const [myBook, setMyBook] = useState<Books[]>([]);
    const [bestSeller, setBestSeller] = useState<Books[]>([])
    const navigate = useNavigate();
    async function ReadingBook(){
        let copy = [...myBook];
        try{

            const {data} = await  axios.get('/book/getReadingBook',
            {
                headers : {
                    Authorization: token,
                }
            }
            );
            console.log("myBook", data);
            copy = data;
            setMyBook(copy);
        }catch (error) {
            if(axios.isAxiosError(error)){
                console.log('error : ' , error.message);
            }else{
                console.log('unexpect error :' , error);
            }
        }
    }

    const getBestSeller = async ()=> {
        let copy = [...bestSeller];
        const URL   = process.env.REACT_APP_API_BEST_KEY;

        try{

            if(typeof URL === 'string'){
                const {data} = await  axios.get(URL);

                copy = data.item;
                setBestSeller(copy);

            }else{
                copy = [];
            }

        }
        catch (e:any){
            console.log(e.message());
        }
    }

    useEffect(()=>{
        ReadingBook();
        getBestSeller();
    },[])
    return (
        <>
        <Layout>
            <span>읽고 있는 책</span>
        <BookSlide>
            {
                myBook.map((item,idx)=>{
                    return(
                        <BookContent>
                        <BookCover src={item.cover} width=""/>
                        </BookContent>
                    )
                })
            }
        </BookSlide>
        </Layout>

        <BestSellerBox>
            <span>베스트 셀러</span>
            {
                bestSeller.map((item, idx) => {

                    return(
                        <ul>
                            <span>{idx +1}</span>
                            <BookContent
                                onClick={()=>{navigate('/detail', {state : {bookId : item.isbn13}})}}
                            >
                                <BookCover src={item.cover} width=""/>
                                <BookContentKeyword>
                                    <div>{item.title}</div>
                                    <div>{item.author}</div>
                                </BookContentKeyword>
                            </BookContent>
                        </ul>
                    )

                })
            }

        </BestSellerBox>

        </>


    )
}

const Layout = styled.div`


  margin: 0.9rem 0.75rem 1.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 0.07rem solid #91988a;
  font-family: 'omyu_pretty';
  span{
    font-size: 20px;
    font-weight: 700;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  /*  .slick-slide {
      border: 20px solid #e8e7dd;
      box-sizing: border-box;
    }*/
  
`

const BestSellerBox = styled.div`
  margin: 0.9rem 0.75rem 1.25rem 0.75rem;
  border-radius: 0.25rem;
  border: 0.07rem solid #91988a;
  font-family: 'omyu_pretty';
  flex-direction: column;
  span{
    font-size: 20px;
    font-weight: 700;
    margin-left: 1rem;
    margin-top: 1rem;
  }

`
const BookContent = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
 
  &:hover {
    transform: translate(-0.1rem);
    cursor: pointer;
  }
  .noResults {
    margin-left: 1rem;
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
export default Main;
import styled from 'styled-components';
import { BsStarFill } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import {RootState} from "../stores/store";

interface StarRatingProps {
    star: number;
    setStar: Dispatch<SetStateAction<number>>;
}

const Wrapper = styled.div`
  display: flex;
  width: 9.375rem;
  justify-content: space-between;
  .inactive {
    color: #c9c8c8;
  }
  .active {
    color: orange;
  }
`;

const Star = styled(BsStarFill)`
  cursor: pointer;
  font-size: 1.375rem;
`;


const StarRating = ({star, setStar} : StarRatingProps) => {
    const bookInfo= useSelector((state :RootState)=> state.book.bookResponse)
    const starArr = [1, 2, 3, 4, 5];
    const {token} =  useSelector((state: RootState) => state.member);

    async function saveScore( score:number ){
        setStar(score);

        await axios({
            method : 'post',
            url : '/book/saveScore',
            data : {score : score, isbn13 : bookInfo.isbn13},
            headers : {  Authorization : token}
            },
        ).then((res)=>{
            console.log(res.data)
        }).catch((e)=>{
            console.log(e.message());
        })
    }
    return (
        <Wrapper>
            {starArr.map((score, index) => (
                <Star
                    key={index}
                    className={score <= star ? 'active' : 'inactive'}
                    onClick={()=>{
                        saveScore(score)
                    }}
                />
            ))}
        </Wrapper>
    );
};

export default StarRating;
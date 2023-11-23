import styled from 'styled-components';
import { BsStarFill } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';



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

type props = {
    star : number;
    setStar : Function;
}
const StarRating = ({star, setStar} : props) => {
    const starArr = [1, 2, 3, 4, 5];

    return (
        <Wrapper>
            {starArr.map((score, index) => (
                <Star
                    key={index}
                    className={score <= star ? 'active' : 'inactive'}
                    onClick={() => setStar(score)}
                />
            ))}
        </Wrapper>
    );
};

export default StarRating;
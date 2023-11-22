import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  display: inline-block;
  padding: 0.3rem;
`;

const Img = styled.img`
  border-radius: 0.3rem;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  cursor: pointer;
  transition: transfrom 300ms ease-in;
  &:hover {
    transform: scale(1.02);
  }
  width: ${(props) => props.width || '5.3rem'};
`;

type props = {
    src : string
    width : string
}

function BookCover({src, width } : props) {

    return (
        <>
            <Wrapper>
                <Img src={src} width={width}/>
            </Wrapper>
        </>
    )
}

export default BookCover;
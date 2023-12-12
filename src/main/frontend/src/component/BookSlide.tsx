import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";


const StyleSlider = styled(Slider)`

  width: 100%;
  height: 100%;
  .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
    //슬라이드의 위치
    bottom: 10px;
  }

 /* .slick-arrow {
    display: flex;
    z-index: 10;
    width: 1vw;
    height: 1vw;
  }

  .slick-prev {
    left: -1.2vw;
    cursor: pointer;
    &::before {
      content: '';
    }
  }

  .slick-next {
    right: -1.1vw;
    cursor: pointer;
    &::before {
      content: '';
    }*/
`
interface Props {
    children : React.ReactNode;
}

interface NextArrowProps {
    onClick? : React.MouseEventHandler<HTMLDivElement>;
}

function NextArrow ({onClick} :NextArrowProps){
    return <div className="slick-next" onClick={onClick}>다음</div>
}
export const BookSlide = ({children}:Props) => {
    const settings = {
        dots: true,
        infinite : false, 	//무한 반복 옵션
        slidesToShow:4,
        slidesToScroll: 1,
/*        prevArrow : "<button type='button' className='slick-prev'>Previous</button>",	*/	// 이전 화살표 모양 설정
       /* nextArrow : <NextArrow/>,*/
    }

    return(
        <StyleSlider {...settings}>{children}</StyleSlider>
    )
}





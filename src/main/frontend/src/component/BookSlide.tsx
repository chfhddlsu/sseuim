import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";

const SlideWrapper = styled.section`
  position: relative;
`;

interface Props {
    children : React.ReactNode;
}
export const BookSlide = ({children}:Props) => {
    const settings = {
        dots: true,
        infinite : false, 	//무한 반복 옵션
        arrows: true, 		// 옆으로 이동하는 화살표 표시 여부
        slidesToShow:4,
        slidesToScroll: 1,
       // prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// 이전 화살표 모양 설정
       // nextArrow : "<button type='button' class='slick-next'>Next</button>",
    }

    return(
        <SlideWrapper>
            <Slider {...settings}>{children}</Slider>
        </SlideWrapper>
    )
}





import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import {BiBookHeart} from 'react-icons/bi';
import {BsPersonGear} from 'react-icons/bs';
import logo from '../img/Logo.png'
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";
const HeaderWrapper = styled.header`

  height: 3.75rem;
  padding: 0 0.6rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  /* 추가 */
  min-width: 375px;
`;
const Logo = styled.div`
  height: 100%;
  margin: auto;
  cursor: pointer;
  img {
    height: 4rem;
    @media screen and (max-width: 390px) {
      height: 2.8rem;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  height: 100%;
  font-family: 'NPSfontBold';

`

const StyledLink = styled(Link)`
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.3rem;
  text-decoration: none;
  color: #282c34;
  &:hover {
    transform: translate(-0.1rem);
    cursor: pointer;
  }

  p {
    font-size: 0.6rem;
    text-align: center;
    white-space: nowrap;
    @media screen and (max-width: 390px) {
      display: none;
    }
  }
`;


function Header () {
    const { isLogin } = useSelector((state: RootState) => state.member);

    return (


        <HeaderWrapper>
            <Link to='/'>
               <Logo>
                   <img src={logo} alt='logo_icon'/>
               </Logo>
            </Link>

            {
                isLogin === true ?
                    <Menu>
                        <StyledLink to='/li'>
                            <BiBookHeart size='1.7rem'/>
                            <p> 내 서재 </p>
                        </StyledLink>
                        <StyledLink to='/li'>
                            <FiSearch size='1.5rem'/>
                            <p> 책 검색</p>
                        </StyledLink>
                        <StyledLink to='/li'>
                            <BsPersonGear size='1.5rem'/>
                            <p> 내 정보</p>
                        </StyledLink>
                    </Menu>
                    : <Menu></Menu>
            }

        </HeaderWrapper>

    );
}

export default Header;
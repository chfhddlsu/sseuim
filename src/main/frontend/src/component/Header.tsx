import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import {BiBookHeart} from 'react-icons/bi';
import {BsPersonGear} from 'react-icons/bs';
import logo from '../img/Logo.png'
import {useSelector} from "react-redux";
import {RootState} from "../stores/store";
const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;  min-width: 375px;
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
  list-style: none;
  display: flex;
  margin: 0;
  padding-left: 2rem;
  font-family: 'NPSfontBold';

`

const StyledLink = styled(Link)`
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.5rem;
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
                        <StyledLink to='/library'>
                            <BiBookHeart size='1.7rem'/>
                            <p> 내 서재 </p>
                        </StyledLink>
                        <StyledLink to='/search'>
                            <FiSearch size='1.5rem'/>
                            <p> 책 검색</p>
                        </StyledLink>
                        <StyledLink to='/myPage'>
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
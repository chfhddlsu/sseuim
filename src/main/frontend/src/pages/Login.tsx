import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function Login (){
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <Container>
            <form>
                <FormWrapper>
                    <label htmlFor='id'>아이디</label>
                    <input
                        type='text'
                        value={id}
                        placeholder='아이디'
                    />
                </FormWrapper>
                <FormWrapper>
                    <label htmlFor='pwd'>비밀번호</label>
                    <input
                        type='password'
                        value={pwd}
                        placeholder='비밀번호'
                    />
                </FormWrapper>
                <button type='submit' className='signInBtn'>
                    로그인하기
                </button>
                <Link to='/join'>아직 회원이 아니신가요?</Link>
            </form>
        </Container>
    );
}


export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'omyu_pretty';

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 4rem ;
    border-radius: 0.25rem;
    box-shadow: 0rem 0rem 0.25rem 0rem rgba(0 0 0 / 20%);
    background-color: #e8e7dd;
  }

  // 로그인하기 버튼
  button {
    background-color: #9ba986;
    padding: 0.5rem 0.75rem;
    border: 0.063rem solid var(--clear-day);
    border-radius: 0.25rem;
    width: 100%;
    margin-bottom: 0.7rem;
    margin-top: 1rem;
    color: black;
    font-family: 'omyu_pretty';

    &:hover {
      cursor: pointer;
    }
  }
  
  a {
    font-size: 0.7rem;
    text-decoration: none;
    color: #747474;
    font-family: 'omyu_pretty';

    &:hover {
      color: black;
    }
  }
`;

export const FormWrapper = styled.div`
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    width: 100%;
    
   

    &::placeholder {
      font-size: 0.9rem;
      font-family: 'omyu_pretty';
    }
  }
`;

export default Login;
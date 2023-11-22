import styled from 'styled-components';
import { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AppDispatch, RootState} from "../stores/store";
import {useDispatch, useSelector} from "react-redux";
import {init, join, login} from "../stores/member/memberSlice";
import {useForm, SubmitHandler} from "react-hook-form";
import React from 'react';
import {Member} from "../types/basic";


function Login (){
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLogin, isError } = useSelector((state: RootState) => state.member);

    useEffect(() => {

        if (isLogin) {
            navigate('/library');
        }

        if (isError) {
            dispatch(init());
        }

    }, [isError, isLogin, dispatch, navigate]);

    const {
        register,
        handleSubmit  ,
        formState : {errors, isSubmitting},  // isSubmitting 중복제출 방지
    } = useForm<Member>({mode:'onChange'})

    const onSubmit : SubmitHandler<Member> = (member :Member )  => {

        dispatch(login(member));
    }

    return (
        <Container>
            <form onKeyDown={(event)=>{return event.key != 'Enter'}} onSubmit={handleSubmit(onSubmit)}>
                <FormWrapper>
                    <label htmlFor='email'>이메일</label>
                    <input
                        type='email'
                        placeholder='user@email.com'
                        {...register('email', {
                            required: '이메일을 입력해주세요.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "올바른 이메일 형태가 아닙니다."
                            }
                        })}
                    />
                    {errors.email && <span >{errors.email.message}</span>}
                </FormWrapper>

                <FormWrapper>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        maxLength={20}
                        {...register('password', {
                            required: '비밀번호를 입력해주세요.',
                            minLength: {
                                value: 6,
                                message: '6글자 이상 입력해주세요.',
                            },
                        })}
                    />
                    {errors.password && <span >{errors.password.message}</span>}
                </FormWrapper>

                <button type='submit'  disabled={isSubmitting}>
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
  
  span {
    text-align: left;
    margin-left: 1rem;
    font-size: 0.8rem;
    color: red;
  }
`;

export default Login;
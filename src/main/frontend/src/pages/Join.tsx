
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {useForm, SubmitHandler, FieldErrors} from "react-hook-form";
import {Member} from '../types/basic';
import { useSelector, useDispatch } from 'react-redux';
import {init, join} from "../stores/member/memberSlice";
import {AppDispatch, RootState} from "../stores/store";
import React, {useEffect, useState} from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {isDisabled} from "@testing-library/user-event/dist/utils";

function Join () :JSX.Element {
    const dispatch :AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isDuple , setIsDuple] = useState(false);
    const [disabled , setDisabled] = useState(false);
    const {isSuccess} = useSelector((state:RootState)=> state.member);
    let [id , setId] = useState('');

    useEffect(()=>{

        if(isSuccess === true){
            navigate('/login');
        }

        dispatch( init() );
    },[isSuccess])

    const {
        register,
        handleSubmit  ,
        formState : {errors, isSubmitting},  // isSubmitting 중복제출 방지
    } = useForm<Member>({mode:'onChange'})

    const onSubmit : SubmitHandler<Member> = (member :Member )  => {

        if(disabled === false){
            alert("아이디 중복체크 해주세요");
            return;
        }else if (isDuple === true){
            alert("이미 사용중인 아이디 입니다.");
            return;
        }


        dispatch( join(member) );

    }


    const onClick = async () => {

        console.log("아이디 " + id);
        if(id === " "){return}
        try {
             await axios.get(
                    '/idCheck',
                    {
                        params : {id : id}
                    }
                )
                 .then((res)=>{
                     console.log("응답 ..." + res.data)
                     if( res.data != 0 ){
                         setIsDuple(true);
                         alert("아이디가 존재합니다.");
                     }else{
                         setDisabled(true);
                         alert("사용가능한 아이디 입니다.");
                     }
                })

        }catch (e :any){
            console.log(e.message);
        }

    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    <label htmlFor='id'>아이디</label>
                    {errors.id && <span >{errors.id.message}</span>}
                </Label>
                <FormWrapper>
                    <input
                        type='text'
                        maxLength={20}
                        onClick={(e )=>{  const target = e.target as HTMLInputElement; console.log(target.value); setId(target.value)}}
                        {...register('id',{
                                required : '아이디를 입력해주세요',
                                minLength : {
                                    value : 2,
                                    message : '2글자 이상 입력해 주세요'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: "아이디는 영문과 숫자만 입력가능합니다"
                                }
                            })
                        }
                    />
                    <CheckButton
                        color = ''
                        onClick={onClick}
                        disabled ={disabled}
                    >중복체크
                    </CheckButton>
                </FormWrapper>

                <Label>
                    <label htmlFor='pwd'>비밀번호</label>
                    {errors.pwd && <span >{errors.pwd.message}</span>}
                </Label>
                <FormWrapper>
                    <input
                        type='password'
                        maxLength={20}
                        {...register('pwd', {
                            required: '비밀번호를 입력해주세요.',
                            minLength: {
                                value: 6,
                                message: '6글자 이상 입력해주세요.',
                            },
                        })}
                    />
                </FormWrapper>

                <Label>
                    <label htmlFor='rePwd'>비밀번호 재입력</label>
                    {errors.rePwd && <span >{errors.rePwd.message}</span>}
                </Label>
                <FormWrapper>
                    <input
                        type='password'
                        maxLength={20}
                        {...register("rePwd", {
                            validate: (value, formValues) => {
                                return value === formValues.pwd || "비밀번호가 일치하지 않습니다."
                            }
                        })}
                    />
                </FormWrapper>

                <Label>
                    <label htmlFor='name'>이름</label>
                    {errors.name && <span >{errors.name.message}</span>}
                </Label>
                <FormWrapper>
                    <input
                        type='text'
                        maxLength={20}
                        {...register('name', {
                            required: '이름을 입력해주세요.',
                            minLength: {
                                value: 2,
                                message: '2글자 이상 입력해주세요.',
                            },
                        })}
                    />

                </FormWrapper>

                <Label>
                    <label htmlFor='nickname'>닉네임</label>
                </Label>
                <FormWrapper>
                    <input
                        type='text'
                        maxLength={20}
                        {...register('nickname')}
                    />
                </FormWrapper>

                <Label>
                    <label htmlFor='birth'>생년월일</label>
                    {errors.birth && <span >{errors.birth.message}</span>}
                </Label>
                <FormWrapper>
                    <input
                        type='text'
                        placeholder='19990101'
                        maxLength={8}
                        {...register('birth', {
                            minLength: {
                                value: 8,
                                message: '8글자 입력해주세요.',
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "숫자만 입력가능합니다"
                            }
                        })}
                    />
                </FormWrapper>

                <Label>
                    <label htmlFor='email'>이메일</label>
                    {errors.email && <span >{errors.email.message}</span>}
                </Label>
                <FormWrapper>
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
                </FormWrapper>

                <JoinButton type='submit' className='signInBtn' disabled={isSubmitting}>
                    회원 가입하기
                </JoinButton>

                <Link to='/login'>이미 회원이신가요?</Link>
            </form>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'omyu_pretty';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e8e7dd;
  form {
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 5rem;
    border-radius: 0.25rem;
    box-shadow: 0rem 0rem 0.25rem 0rem rgba(0 0 0 / 20%);
    
  }
  
  
  // 회원가입 링크
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: #747474;

    &:hover {
      color: black;
    }
  }
`;

const JoinButton = styled.button`
 
    background-color: #9ba986;
    padding: 0.7rem 0.75rem;
    border: 0.063rem solid darkolivegreen;
    border-radius: 0.25rem;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-family: 'omyu_pretty';

    &:hover {
      cursor: pointer;
    }
  
`

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    width: 100%;
    font-family: 'omyu_pretty';

    &::placeholder {
      font-size: 0.9rem;
      font-family: 'omyu_pretty';
    }
  }
   
`;

const Label = styled.div`
  width: 100%;
  padding-bottom: 0.6rem;
  label {
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  span {
    text-align: right;
    margin-left: 1rem;
    font-size: 0.8rem;
    color: red;
  }
`
const CheckButton = styled.button`
  background-color: ${props => props.color == "" ? '#9ba986' : props.color};
  font-family: 'omyu_pretty';
  width: 80px;
  height: 25px;
  border-radius: 0.25rem;
  margin: 0.1rem 0.2rem 0.2rem 0.3rem;
  border: 0.063rem solid darkolivegreen;
`
export default Join;
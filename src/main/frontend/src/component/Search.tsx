import styled from 'styled-components';
import React, {useState} from "react";
import axios from "axios";

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  section {
    display: inline-block;
    height: 80px;
    width: 500px;
    input {
      font-size: 1.2rem;
      border-width: 0.1rem;
      outline: none;
      width: 100%;
      margin: 1.5rem;
      border-radius: 0.25rem;
      font-family: 'omyu_pretty';
    }
  }
  
`;
type props = {
    keyword    : string;
    setBooks   : Function;
    setKeyword : Function;
}

function Search({ keyword, setBooks, setKeyword } : props ) {

    const onSearch= async (e :React.KeyboardEvent) => {
        if(e.key === 'Enter' && keyword !== ''){
            e.preventDefault();  // 새로고침 방지

            const API_URL  = process.env.REACT_APP_API_KEY

            try{
                const {data} = await axios.get(API_URL + keyword);

                setBooks(data.item);
            }catch(e :any){
                console.log("error" + e.message);

            }
        }
    }

    return (
        <>
            <SearchForm>
                <section>
                    <input
                        type="text"
                        placeholder="🔍 책 제목 혹은 저자 입력 "
                        onKeyDown={onSearch}
                        onChange={(e)=> setKeyword(e.target.value) }
                    />
                </section>
            </SearchForm>
        </>
    )
}



export default Search;
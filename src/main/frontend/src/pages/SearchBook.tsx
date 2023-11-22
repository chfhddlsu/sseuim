import styled from "styled-components";
import Search from "../component/Search";
import BookCover from "../component/BookCover";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Books} from "../types/basic";

const Layout = styled.script`
  margin: 0.9rem 0.75rem 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  background-color: #e8e7dd;
  min-width: 355px;
`;

const FirstContent = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
`;

const BookContent = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
 
  &:hover {
    transform: translate(-0.1rem);
    cursor: pointer;
  }
  .noResults {
    margin-left: 1rem;
  }
`;

const BookContentKeyword = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  margin-left: 1rem;
  font-family: 'omyu_pretty'
`;

function SearchBook() {

    let [keyword, setKeyword] = useState('');
    let [books, setBooks] = useState<Books[]>([]);
    const navigate = useNavigate();
    return (
        <Layout>
            <Search keyword={keyword} setBooks={setBooks} setKeyword={setKeyword}></Search>

            {/*책 조회 영역*/}
            {books.length === 0 || keyword === '' ? (
                    <FirstContent> 📢 검색결과가 없습니다. 다시 검색해 주세요. </FirstContent>
                ) :
                books.map((book, idx :number)=>{
                    console.log("dd", book)
                    return (
                        <ul>
                            <BookContent
                                key={idx}
                                onClick={()=>{navigate('detail', {state : {bookId : book.isbn13}})}}
                            >
                                <BookCover src={book.cover} width="" />
                                <BookContentKeyword>
                                    <div>{book.title}</div>
                                    <div>{book.author}</div>
                                </BookContentKeyword>
                            </BookContent>
                        </ul>
                    );
                })
            }
        </Layout>

    )
}

export default SearchBook;
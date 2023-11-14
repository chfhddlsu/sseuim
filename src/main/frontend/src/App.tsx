

import './App.css';
import React, {useEffect, useState} from 'react';
import Header from './component/Header'
import Login from './pages/Login'
import Router from './routes/Router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() {

  let [isLogin] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
      if(isLogin === false ){
          navigate('/login')
      }else {
          console.log("dd")
      }
  },[])

  return (
      <>

       <Header></Header>
    <Router/>
      </>
  );
}

export default App;

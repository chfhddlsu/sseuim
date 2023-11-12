

import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
function App() {

  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <>

        <div>
          서버통신 테스트 중 : {hello}
        </div>

      </>
  );
}

export default App;

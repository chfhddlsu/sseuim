import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Join from '../pages/Join'
function Router () {

    return (
        <Routes>
            <Route path='/login' element={ <Login/> } />
            <Route path='/join' element={<Join/>} />
        </Routes>
    )
}

export  default Router;
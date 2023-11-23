import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Join from '../pages/Join'
import Library from '../pages/Library'
import SearchBooks from "../pages/SearchBooks";
import SearchBook from "../pages/SearchBook";
function Router () {

    return (
        <Routes>
            <Route path='/login'      element={ <Login/>      } />
            <Route path='/join'       element={ <Join/>       } />
            <Route path='/library'    element={ <Library/>    } />
            <Route path='/search'     element={ <SearchBooks/> } />
            <Route path='/detail'     element={ <SearchBook/> } />

        </Routes>
    )
}

export  default Router;
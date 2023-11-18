import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import Registration from './components/Registration';
import Login from './components/Login';
import NotLogin from './components/NotLogin';

function App() {

    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/users/profile' Component={MyProfile}/>
                    <Route path='/auth/register' Component={Registration}/>
                    <Route path='/login' Component={Login}/>
                    <Route path='/auth/logout' Component={Login}/>
                    <Route path='/notlogin' Component={NotLogin}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
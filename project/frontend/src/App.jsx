import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {

    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/users/profile' Component={MyProfile}/>
                    <Route path='/register' Component={Registration}/>
                    <Route path='/login' Component={Login}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
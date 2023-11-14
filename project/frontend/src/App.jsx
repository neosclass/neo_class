import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/MyProfile';

function App() {

    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/users/profile' Component={MyProfile}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
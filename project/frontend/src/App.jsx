import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import Registration from './components/Registration';
import Login from './components/Login';
import NotLogin from './components/NotLogin';
import AllPrivateCourses from './components/AllPrivateCourses';
import FindCourse from './components/FindCourse';
import CreateCourse from './components/CreateCourse';
import TasksFromCourse from './components/TasksFromCourse';
import Task from './components/Task';

function App() {

    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/users/profile' Component={MyProfile}/>
                    <Route path='/auth/register' Component={Registration}/>
                    <Route path='/auth/login' Component={Login}/>
                    <Route path='/auth/logout' Component={Login}/>
                    <Route path='/notlogin' Component={NotLogin}/>
                    <Route path='/courses' Component={AllPrivateCourses}/>
                    <Route path='/users/add/course' Component={FindCourse}/>
                    <Route path='/courses/create' Component={CreateCourse}/>
                    <Route path='/courses/tasks/:course_id' Component={TasksFromCourse}/>
                    <Route path='/courses/tasks/:course_id/:task_id' Component={Task}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
import React from "react";
import classes from './Header.module.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const profileClick = () => {
        navigate("/users/profile");
    }

    const homeClick = () => {
        navigate("/");
    }

    const allCoursesPrivate = () => {
        navigate('/courses')
    }

    const findCourse = () => {
        navigate('/users/add/course')
    }

    const createCourse = () => {
        navigate('/courses/create')
    }

    return (
        <div>
            <div className={classes.tab}>
                <button onClick={homeClick}>Домашняя страница</button>
                <button onClick={findCourse}>Найти курс</button>
                <button onClick={createCourse}>Создать курс</button>
                <button onClick={allCoursesPrivate}>Мои курсы</button>
                <button onClick={profileClick}>Мой профиль</button>
            </div>
        </div>
    );
};

export default Header;
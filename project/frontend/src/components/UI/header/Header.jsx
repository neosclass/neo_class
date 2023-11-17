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

    return (
        <div>
            <div className={classes.tab}>
                <button onClick={homeClick}>Домашняя страница</button>
                <button>Найти курс</button>
                <button>Создать курс</button>
                <button>Мои курсы</button>
                <button onClick={profileClick}>Мой профиль</button>
            </div>
        </div>
    );
};

export default Header;
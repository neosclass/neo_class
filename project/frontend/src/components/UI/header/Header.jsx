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
                <button onClick={homeClick} class="tablinks">Домашняя страница</button>
                <button class="tablinks">Найти курс</button>
                <button class="tablinks">Создать курс</button>
                <button class="tablinks">Мои курсы</button>
                <button onClick={profileClick} class="tablinks">Мой профиль</button>
            </div>
        </div>
    );
};

export default Header;
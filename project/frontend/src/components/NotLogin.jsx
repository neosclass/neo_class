import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";

const NotLogin = (props) => {
    const navigate = useNavigate()


    const HomePage = () => {
        window.location.href = '/'
    }

    return (
        <div>
            <HeaderMegaMenu/>
            <h1>Вы не вошли в свой аккаунт. Сделайте это на главной странице</h1>
            <button onClick={HomePage}>Главная страница</button>
        </div>
    );
};

export default NotLogin;
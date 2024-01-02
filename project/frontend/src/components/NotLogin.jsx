import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";

const NotLogin = (props) => {
    const navigate = useNavigate()


    const HomePage = () => {
        window.location.href = '/'
    }


    const containerStyles = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      };

    return (
        <div>
            <HeaderMegaMenu/>
            <h1>Вы не вошли в свой аккаунт. Сделайте это на главной странице</h1>
            <button onClick={HomePage}>Главная страница</button>

            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
        </div>
    );
};

export default NotLogin;
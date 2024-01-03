import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper, Text, Button } from "@mantine/core";

const NotLogin = (props) => {
    const navigate = useNavigate()


    const HomePage = () => {
        window.location.href = '/'
    }

    const login = () => {
        navigate('/auth/login')
    }


    const containerStyles = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      };

    return (
        <div>
            <HeaderMegaMenu/>
            <Paper style={{ textAlign: 'center', padding: 200 }}>
                <Text style={{ fontSize: '50px' }} fw={700}>Чтобы посетить данный ресурс вы должны быть авторизованы</Text>
                <Button onClick={login}>Войти в аккаунт</Button>
            </Paper>

            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
        </div>
    );
};

export default NotLogin;
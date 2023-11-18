import React from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    const registerForm = () => {
        navigate("/auth/register");
    }
    const loginForm = () => {
        navigate("/auth/login");
    }


    return (
        <div>
            <Header />
            <h2>This project optimizes communication between teacher and student</h2>

            <div>
                <button onClick={registerForm}>Зарегистрироваться</button>
                <button onClick={loginForm}>Войти в аккаунт</button>
            </div>

        </div>
    );
};

export default Home;
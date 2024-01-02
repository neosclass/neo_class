import React from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { Center, Text, Container, Paper } from '@mantine/core';
import { FooterCentered } from "./FooterCentered/FooterCentered";

const Home = () => {

    const containerStyles = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      };


    return (
        <div>
            <div>
                <Container fluid>
                    <HeaderMegaMenu/>
                </Container>
            </div>



            <div>
            <Paper style={{ textAlign: 'center', padding: 200 }}>
                <Text style={{ fontSize: '50px' }} fw={700}>Создавай курсы и присоединяйся к ним</Text>
                <Text style={{ fontSize: '20px' }} fs='italic'>Быть умным и хорошо учиться — две разные вещи. </Text>
            </Paper>
            </div>

            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>

        </div>
        
    );
};

export default Home;
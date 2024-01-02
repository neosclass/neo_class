import React from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { Center, Text, Container } from '@mantine/core';

const Home = () => {

    return (
        <div>
            <div>
                <Container fluid>
                    <HeaderMegaMenu/>
                </Container>
            </div>

            <div>
                <Container fluid>
                    <Center>
                    <Text style={{ fontSize: '50px' }} fw={700}>Создавай курсы и присоединяйся к ним</Text>
                    </Center>
                </Container>
                <Container fluid h={50}>
                    <Center>
                    <Text style={{ fontSize: '20px' }} fs='italic'>Быть умным и хорошо учиться — две разные вещи. </Text>
                    </Center>
                </Container>
            </div>


        </div>
        
    );
};

export default Home;
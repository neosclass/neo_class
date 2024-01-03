import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";
import { InputFindCourse } from "./InputFindCourse/InputFindCourse";
import { Container } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




const FindCourse = () => {
    const navigate = useNavigate()


  const NotLogin = () => {
    navigate('/notlogin')
  }

  const containerStyles = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  };

  useEffect(() => {
    fetch("http://localhost:8000/users/profile", {method: 'GET',
    credentials: 'include' })
      .then(response => {
        if (response.status === 401){
            NotLogin()
        }
        else {
            return response.json()
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [])

    return (
        <div>
            <HeaderMegaMenu/>
            
              <div>
                <Container>
                  <InputFindCourse/>
                </Container>
              </div>

              <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
        </div>
    );
};

export default FindCourse;
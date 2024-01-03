import React, {useState} from "react";
import axios from 'axios';
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";
import { RegisterForm } from "./RegisterForm/RegisterForm";

const Registration = () => {
        const navigate = useNavigate()

        const HomePage = () => {
          navigate('/')
        }


    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };

        const [formData, setFormData] = useState({
          name: '',
          surname: '',
          email: '',
          password: '',
        });
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            const response = await axios.post('http://localhost:8000/auth/register', formData, {withCredentials: true});


            // Handle the response data here
            HomePage()
          } catch (error) {
            // Handle error or display error message
            console.error(error);
          }
        };

      
        return (

            <div>
                <HeaderMegaMenu/>



                <div>
                  <RegisterForm/>
                </div>

                    <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
          </div>
      
    );
};

export default Registration;
import React, {useState} from "react";
import axios from 'axios';
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";

const Login = () => {
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
          email: '',
          password: '',
        });
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            const response = await axios.post('http://localhost:8000/auth/login', formData, {withCredentials: true});
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
                    <form onSubmit={handleSubmit}>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        />
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        />
                        <button type="submit">Submit</button>
                    </form>

                    <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>

          </div>
      
    );
};

export default Login;
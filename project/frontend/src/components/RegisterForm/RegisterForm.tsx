import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
  import classes from './RegisterForm.module.css';
  import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

  export function RegisterForm() {

    const navigate = useNavigate()

    const HomePage = () => {
      navigate('/')
    }


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
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Регистрация
        </Title>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput onChange={handleChange} name="name" value={formData.username} label="Имя" placeholder="Имя" required />
          <TextInput  name="surname" value={formData.username} onChange={handleChange} label="Фамилия" placeholder="Фамилия" required />
          <TextInput  name="email" value={formData.email} onChange={handleChange} label="Почта" placeholder="mail@example.com" required />
          <PasswordInput name="password" onChange={handleChange} value={formData.password} label="Пароль" placeholder="Пароль" required mt="md" />
          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Зарегистрировать
          </Button>
        </Paper>
      </Container>
    );
  }
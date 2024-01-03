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
  import classes from './AuthForm.module.css';
  import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
  
  export function AuthForm() {

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


        const register = () => {
            navigate('/auth/register')
        }
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          С возвращением!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Нет аккаунта?{' '}
          <Anchor size="sm" component="button" onClick={register}>
            Создать аккаунт
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput name="email"
                        value={formData.email}
                        onChange={handleChange} label="Почта" placeholder="mail@example.com" required />
          <PasswordInput name="password"
                        value={formData.password}
                        onChange={handleChange} label="Пароль" placeholder="Пароль" required mt="md" />
          <Group justify="space-between" mt="lg">
          </Group>
          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Войти
          </Button>
        </Paper>
      </Container>
    );
  }
import { Avatar, Text, Button, Paper } from '@mantine/core';
import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export function UserInfo() {
    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const HomePage = () => {
      navigate("/");
  }

    const NotLogin = () => {
      navigate("/notlogin")
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
        .then(jsonData => setData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
    }, [])
  
  
    
    const deleteData = async () => {
      try {
        await axios.delete('http://localhost:8000/auth/logout', {withCredentials: true});
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };

    const HandleButton = async () => {
      await deleteData();
      HomePage();
    };

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src="data:image/png;base64,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"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {data.name} {data.surname}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {data.email}
      </Text>

      <Button variant="default" fullWidth mt="md" onClick={HandleButton}>
        Выйти из аккаунта
      </Button>
    </Paper>
  );
}
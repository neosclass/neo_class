import cx from 'clsx';
import { Table, ScrollArea, Container } from '@mantine/core';
import classes from './TableOfTasks.module.css'
import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useMantineTheme, Button, Center, Text, Paper, Group } from '@mantine/core';
import axios from 'axios';




export function TableOfTasks() {
  const [scrolled, setScrolled] = useState(false);

  const { course_id } = useParams();

  const navigate = useNavigate()

  const [data, setData] = useState([]);


  const [course_creator, setCreator] = useState([])

  const [userData, setUserData] = useState(0);

  const containerStyles = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  };


  const HomePage = () => {
    navigate("/");
}

  const NotLogin = () => {
      navigate("/notlogin")
    }
  
  const Task = (course_id, task_id) => {
    navigate(`/courses/tasks/${course_id}/${task_id}`)
  }

  const CreateTask = () => {
    navigate(`/tasks/${course_id}`)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/get_current_user_id', {withCredentials: true});
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
      fetch(`http://localhost:8000/courses/tasks/${course_id}`, {method: 'GET',
      credentials: 'include' })
        .then(response => {
          if (response.status === 401){
              NotLogin()
          }
          else {
              return response.json();
          }
        })
        .then(jsonData => setData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
  }, [])

useEffect(() => {
  fetch(`http://localhost:8000/courses/${course_id}`, {method: 'GET',
  credentials: 'include' })
    .then(response => {
      if (response.status === 401){
          NotLogin()
      }
      else {
          return response.json();
      }
    })
    .then(jsonData => setCreator(jsonData))
    .catch(error => console.error('Error fetching data:', error));
}, [])



  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.description}</Table.Td>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td><Button onClick={() => Task(course_id, row.id)}>Перейти к заданию</Button></Table.Td>
    </Table.Tr>
  ));

  return (

    <div>

        <div>
        <Paper style={{ textAlign: 'center'}}>
                <Text style={{ fontSize: '50px' }} fw={700}>{course_creator.title}</Text>
                <Text style={{ fontSize: '25px' }}>{course_creator.description}</Text>
            </Paper>
        </div>

        <div>
            <Paper style={{ textAlign: 'center', margin: 25}}>
                {course_creator.created_by == userData.user_id ? <Button onClick={CreateTask}>Добавить задание</Button> : <p></p>}
            </Paper>    
        </div>

        <div>
            <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <Table.Tr>
                    <Table.Th>Название</Table.Th>
                    <Table.Th>Описание</Table.Th>
                    <Table.Th>Номер</Table.Th>
                </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            </ScrollArea>
        </div>
    </div>
  );
}
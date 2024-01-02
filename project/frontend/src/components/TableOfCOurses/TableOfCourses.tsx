import cx from 'clsx';
import { Table, ScrollArea } from '@mantine/core';
import classes from './TableOfCourses.module.css'
import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { useMantineTheme, Button } from '@mantine/core';



export function TableOfCourses() {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate()

  const theme = useMantineTheme();

    const [data, setData] = useState([]);

    const NotLogin = () => {
      navigate("/notlogin")
    }

    const Task = (course_id) => {
        navigate(`/courses/tasks/${course_id}`)
    }
    

        useEffect(() => {
            fetch("http://localhost:8000/courses", {method: 'GET',
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

  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.description}</Table.Td>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td><Button variant="default" onClick={() => Task(row.id)}>Зайти</Button></Table.Td>
    </Table.Tr>
  ));

  return (
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
  );
}
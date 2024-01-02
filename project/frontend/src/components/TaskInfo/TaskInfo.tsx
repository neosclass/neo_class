import { Card, Image, Text, Group, Badge, Center, Button, Paper, Textarea } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './TaskInfo.module.css';
import React, {useState, useEffect} from "react";
import axios, { all } from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import DownloadButton from 'components/UI/DownloadButton/DownloadButton';
import { CommentHtml } from 'components/CommentsTask/CommentsTask';


export function TaskInfo() {

  const { course_id } = useParams();
  const { task_id } = useParams();

  const navigate = useNavigate();


  const [data, setData] = useState([]);

  const [datas, setText] = useState('');

  const [course_creator, setCreator] = useState([])
  const [userData, setUserData] = useState(0);

  const [allComments, setAllComments] = useState([]);


  const HomePage = () => {
      navigate("/");
  }

  const NotLogin = () => {
        navigate("/notlogin")
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/comment/${task_id}`, {withCredentials: true});
        setAllComments(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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

  const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('data', datas);
      console.log(formData.get('data'))

    const response = await fetch(`http://localhost:8000/comment/${task_id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: datas })
      ,
    });
    const data = await response.json();
    console.log('Comment added:', data);
    window.location.reload();

  };


  useEffect(() => {
      fetch(`http://localhost:8000/tasks/${course_id}/${task_id}/info`, {method: 'GET',
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

  return (

    <div>


            <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i0.wp.com/www.red-nuts.com/wp-content/uploads/2015/03/%D0%B4%D0%B8%D0%B4%D0%B6%D0%B5%D0%B8%D0%BD%D0%B3-%D0%B8-%D1%83%D1%87%D0%B5%D0%B1%D0%B0-2.jpg?fit=3008%2C2000&ssl=1" alt="Tesla Model S" />
            </Card.Section>

            <Group justify="space-between" mt="md">
                <div>
                <Text fw={500}>{data.title}</Text>
                <Text fz="xs">
                    {data.description}
                </Text>
                </div>
            </Group>

            <Card.Section className={classes.section}>
                <Group gap={30}>

                <DownloadButton/>
                </Group>
            </Card.Section>
            </Card>


            <Textarea
                    value={datas}
                    onChange={(e) => setText(e.target.value)}
                    label="Оставить комментарий"
                    placeholder="Ваш комментарий"
            />
        <Button onClick={handleSubmit}>Добавить комментарий</Button>

    <div>
      <CommentHtml/>
    </div>

    </div>
  );
}
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Header from "./UI/header/Header";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";

const TasksFromCourse = ({ match }) => {
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



    return (
      <div>
          <HeaderMegaMenu/>
        
        <h1>Код курса: {course_id}</h1>
        <div>
        {course_creator.created_by == userData.user_id ? <button onClick={CreateTask}>Добавить задание</button> : <p></p>}
        </div>
        <div>
                {data.map(item => (
                    <div key={item.id}>
                      <h2>Название: {item.title}</h2>
                      <h3>Описание: {item.description}</h3>
                      <button onClick={() => Task(course_id, item.id)}>Перейти к заданию</button>
          </div>
                ))};
        </div>


        <div>
          <button onClick={HomePage}>Главная страница</button>
        </div>

        <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
      </div>
    );
  };
  

export default TasksFromCourse;
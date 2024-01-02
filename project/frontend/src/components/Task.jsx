import React, {useState, useEffect} from "react";
import axios, { all } from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import DownloadButton from "./UI/DownloadButton/DownloadButton";
import Header from "./UI/header/Header";
import MyComponent from "./utils/dataArray";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Container, Paper } from "@mantine/core";
import { TaskInfo } from "./TaskInfo/TaskInfo";
import { CommentHtml } from "./CommentsTask/CommentsTask";

const Task = () => {

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

    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
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
          <HeaderMegaMenu/>


          <div>
            <Container size='xs'>
                <TaskInfo/>
            </Container>
          </div>


          
            <div key={data.id}>
              <h2>Название: {data.title}</h2>
              <h3>Описание: {data.description}</h3>
            </div>

          <div>
            <DownloadButton />
          </div>
          
          <div>
            <textarea value={datas} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleSubmit}>Добавить комментарий</button>
          </div>

          <div>
              {course_creator.created_by == userData.user_id ? allComments.map(item => (
                    <div key={item.id}>
                      <h2>Комментатор: {item.user_id}</h2>
                      <h3>Комментарий: {item.data}</h3>
                    </div>
                    
                )) : allComments.filter(comment => comment.user_id == userData.user_id).map(item => (
                  <div key={item.id}>
                    <h2>Комментатор: {item.user_id}</h2>
                    <h3>Комментарий: {item.data}</h3>
                  </div>))}
    
          </div>


            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
    </div>
  );
};

export default Task;

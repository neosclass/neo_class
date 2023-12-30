import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import DownloadButton from "./UI/DownloadButton/DownloadButton";
import Header from "./UI/header/Header";

const Task = () => {

    const { course_id } = useParams();
    const { task_id } = useParams();

    const navigate = useNavigate();


    const [data, setData] = useState([]);

    const [datas, setText] = useState('');


    const HomePage = () => {
        navigate("/");
    }
  
    const NotLogin = () => {
          navigate("/notlogin")
    }

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
          <Header />
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
                <button onClick={HomePage}>Главная страница</button>
            </div>
    </div>
  );
};

export default Task;

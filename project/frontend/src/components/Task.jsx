import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import DownloadButton from "./UI/DownloadButton/DownloadButton";
import Header from "./UI/header/Header";

const Task = () => {

    const { course_id } = useParams();
    const { task_id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const HomePage = () => {
        navigate("/");
    }
  
    const NotLogin = () => {
          navigate("/notlogin")
    }

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
                <button onClick={HomePage}>Главная страница</button>
            </div>
    </div>
  );
};

export default Task;

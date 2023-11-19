import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const TasksFromCourse = ({ match }) => {
    const { course_id } = useParams();

    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const HomePage = () => {
      navigate("/");
  }

    const NotLogin = () => {
        navigate("/notlogin")
      }

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

      

    return (
      <div>
        <h1>Код курса: {course_id}</h1>

        <div>
                {data.map(item => (
                    <div key={item.id}>
                      <h2>Название: {item.title}</h2>
                      <h3>Описание: {item.description}</h3>
                    </div>
                ))}
        </div>


        <div>
          <button onClick={HomePage}>Главная страница</button>
        </div>
      </div>
    );
  };
  

export default TasksFromCourse;
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const TasksFromCourse = ({ match }) => {
    const { course_id } = useParams();

    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const NotLogin = () => {
        navigate("/notlogin")
      }

    useEffect(() => {
        fetch("http://localhost:8000/courses/tasks/${course_id}", {method: 'GET',
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

      

    return (
      <div>
        <h2>Data Component</h2>
        <p>{course_id}</p>
      </div>
    );
  };
  

export default TasksFromCourse;
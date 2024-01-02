import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";

const AllPrivateCourses = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const NotLogin = () => {
      navigate("/notlogin")
    }

    const Task = (course_id) => {
        navigate(`/courses/tasks/${course_id}`)
    }
    
    const containerStyles = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      };

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
  

    return (
        <div>
            <HeaderMegaMenu/>

            <div>
                {data.map(item => (
                    <div key={item.id}>
                    <h2>Название: {item.title}</h2>
                    <h3>Описание: {item.description}</h3>
                    <p>Код курса: {item.id}</p>
                    <button onClick={() => Task(item.id)}>Зайти в курс</button>
                    </div>
                ))}
            </div>
            

            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>

        </div>
    );
};

export default AllPrivateCourses;
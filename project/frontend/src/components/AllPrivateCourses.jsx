import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";

const AllPrivateCourses = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const HomePage = () => {
      navigate("/");
  }

    const NotLogin = () => {
      navigate("/notlogin")
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
  

    return (
        <div>
            <Header />

            <div>
                {data.map(item => (
                    <div key={item.id}>
                    <p>{item.id}</p>
                    <h2>Название: {item.title}</h2>
                    <h3>Описание: {item.description}</h3>
                    <button>Зайти в курс</button>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default AllPrivateCourses;
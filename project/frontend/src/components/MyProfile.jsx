import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";

const MyProfile = (props) => {

      const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:8000/users/profile", {method: 'GET',
        credentials: 'include' })
          .then(response => response.json())
          .then(jsonData => setData(jsonData))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    
      
      console.log(data);


    return (
        <div>
            <Header />
            <h2>Мой профиль</h2>
            <div>
                <ul>
                    {[data].map(item => (
                    <li key={1}>Почта: {item.email} </li>
                    ))}

                    {[data].map(item => (
                    <li key={2}>Имя: {item.name} </li>
                    ))}

                    {[data].map(item => (
                    <li key={3}>Фамилия: {item.surname} </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProfile;
import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";

const MyProfile = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('http://0.0.0.0:8000/users/profile')
        .then(response => response.json())
        .then(jsonData => setData(jsonData))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  


    return (
        <div>
            <Header />
            <h2>Мой профиль</h2>
            <div>
                <ul>
                    {data.map(item => (
                    <li key={item.id}>{item.id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProfile;
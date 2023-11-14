import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";

const MyProfile = (props) => {

    const [users, setUsers] = useState([])

    const fetchUserData = () => {
      fetch("http://localhost:8000/users/profile")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUsers(data)
        })
    }
  
    useEffect(() => {
      fetchUserData()
    }, [])
  


    return (
        <div>
            <Header />
            <h2>Мой профиль</h2>
            <div>
                <ul>
                    {users.map(item => (
                    <li key={item.id}>{item.id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProfile;
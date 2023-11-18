import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const MyProfile = (props) => {
      const navigate = useNavigate()

      const [data, setData] = useState([]);

      const HomePage = () => {
        navigate("/");
    }

      const NotLogin = () => {
        navigate("/notlogin")
      }
      
        fetch("http://localhost:8000/users/profile", {method: 'GET',
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
    
      
      const deleteData = async () => {
        try {
          await axios.delete('http://localhost:8000/auth/logout', {withCredentials: true});
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      };

      const HandleButton = async () => {
        await deleteData();
        HomePage();
      };
    


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

                <button onClick={HandleButton}>Выйти из аккаунта</button>
            </div>
        </div>
    );
};

export default MyProfile;
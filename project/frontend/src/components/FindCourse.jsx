import React, {useState, useEffect} from "react";
import Header from "./UI/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";

const FindCourse = () => {
    const navigate = useNavigate()

    const HomePage = () => {
      navigate("/");
  }

    const NotLogin = () => {
      navigate("/notlogin")
    }

    const [formData, setFormData] = useState({
        id: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/users/add/course', formData, {withCredentials: true});
          // Handle the response data here
          if (response.status === 401) {
            NotLogin()
          }
          HomePage()
        } catch (error) {
          // Handle error or display error message
          console.error(error);
        }
      };
    
  

    return (
        <div>
            <HeaderMegaMenu/>
            <form onSubmit={handleSubmit}>
                        <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="Course ID"
                        />
                        <button type="submit">Submit</button>
                    </form>
        </div>
    );
};

export default FindCourse;
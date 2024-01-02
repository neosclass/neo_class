import React, {useState} from "react";
import Header from "./UI/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";

const CreateCourse = () => {
    const navigate = useNavigate()

    const HomePage = () => {
      navigate("/");
  }

    const NotLogin = () => {
      navigate("/notlogin")
    }

    const [formData, setFormData] = useState({
        title: '',
        description: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/courses', formData, {withCredentials: true});
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
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        />
                        <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        />
                        <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateCourse;
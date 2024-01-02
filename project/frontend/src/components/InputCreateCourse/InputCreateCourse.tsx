import { useState } from 'react';
import { TextInput, Button, useMantineTheme } from '@mantine/core';
import classes from './InputCreateCourse.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function InputCreateCourse() {


  const theme = useMantineTheme();


  const navigate = useNavigate()

  const HomePage = () => {
    navigate("/courses");
}

  const NotLogin = () => {
    navigate("/notlogin")
  }

  const [formData, setFormData] = useState({
      title: '',
      description: '',
    });
  
    const handleChange = (e) => {
      console.log(e.target.value)
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
        <div>
            <TextInput
              name="title"
              placeholder="Название курса"
              required
              classNames={classes}
              value={formData.title}
              onChange={handleChange}

              mt="md"
              autoComplete="nope"

          />
        </div>

        <div>
            <TextInput
              name="description"
              placeholder="Описание курса"
              required
              classNames={classes}
              value={formData.description}
              onChange={handleChange}

              mt="md"
              autoComplete="nope"

          />
        </div>

        <div>
        <Button
              mt="md"
              fullWidth
              className={classes.button}
              onClick={handleSubmit}
              color={theme.primaryColor}
            >
              <div>
                {'Создать курс'}
              </div>

    </Button>
        </div>
    </div>
    
  );
}
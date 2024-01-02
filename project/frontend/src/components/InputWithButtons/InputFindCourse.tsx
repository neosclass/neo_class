import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function InputFindCourse(props: TextInputProps) {
  const theme = useMantineTheme();

  const navigate = useNavigate()

  const HomePage = () => {
    navigate("/courses");
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
    <TextInput
    name="id" 
      onChange={handleChange}
      radius="xl"
      size="md"
      placeholder="Найти курс"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={handleSubmit} value={formData.id}>
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Header from "./UI/header/Header";
import axios from "axios";


function CreateTask() {
    const { course_id } = useParams();
    
    const [files, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('files', files);
      formData.append('title', title);
      formData.append('description', description);
  
      axios.post(`http://localhost:8000/tasks/${course_id}`, formData, {credentials: 'include', 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('Файл успешно загружен', response.data);
        })
        .catch(error => {
          console.error('Ошибка при загрузке файла', error);
        });
    };
  
    return (

    <div>
        <Header></Header>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
        <button type="submit">Отправить</button>
      </form>
      </div>
    );
  };
  

  

export default CreateTask;
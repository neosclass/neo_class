import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Header from "./UI/header/Header";
import axios from "axios";

const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('param1', 'value1');
    formData.append('param2', 'value2');
  
    fetch('http://your-fastapi-server-url/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  
export default handleFileUpload;
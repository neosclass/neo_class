import React from 'react';
import { useParams } from "react-router-dom";

const DownloadButton = () => {
    const { course_id } = useParams();
    const { task_id } = useParams();

  const handleDownload = () => {
        fetch(`http://localhost:8000/tasks/${course_id}/${task_id}/files`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/zip',
              // Add any required headers here
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.zip');
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });

  };

  

  return (
    <button onClick={handleDownload}>Download File</button>
  );
};

export default DownloadButton;

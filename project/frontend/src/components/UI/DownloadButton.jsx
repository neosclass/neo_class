import React from 'react';

const DownloadButton = () => {
    const { course_id } = useParams();
    const { task_id } = useParams();

  const handleDownload = () => {
        fetch(`http://localhost:8000/tasks/${course_id}/${task_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers for authentication or authorization
          }
        })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.jpg');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
};

export default DownloadButton;

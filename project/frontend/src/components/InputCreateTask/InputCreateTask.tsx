import { useState, useRef} from 'react';
import { Text, Group, Button, rem, useMantineTheme, TextInput, Container, FileButton, Paper } from '@mantine/core';
import classes from './InputCreateTask.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export function InputCreateTask() {


  const theme = useMantineTheme();

  const openRef = useRef<() => void>(null);

  const navigate = useNavigate()

  const { course_id } = useParams();
  
  const [files, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const HomePage = () => {
    navigate("/courses");
}



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', files);
    formData.append('title', title);
    formData.append('description', description);

    axios.post(`http://localhost:8000/tasks/${course_id}`, formData, {withCredentials: true, 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    HomePage()
      .then(response => {
        console.log('Файл успешно загружен', response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла', error);
      });
  };



  return (
    <div>
        <Container>
        <div>
            <TextInput
              name="title"
              placeholder="Название задания"
              required
              classNames={classes}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mt="md"
              autoComplete="nope"

          />
        </div>

        <div>
            <TextInput
              name="description"
              placeholder="Описание задания"
              required
              classNames={classes}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mt="md"
              autoComplete="nope"

          />
        </div>

        <div>
        <>
      <Group justify="center" h={50}>
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Загрузить файл</Button>}
        </FileButton>
      </Group>

      {files && (
        <Text size="sm" ta="center" mt="sm">
          Выбран файл: {files.name}
        </Text>
      )}
    </>
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
                {'Создать задание'}
              </div>
            </Button>
        </div>
        </Container>
    </div>
    
  );
}
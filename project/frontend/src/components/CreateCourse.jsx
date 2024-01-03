import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper, Container } from "@mantine/core";
import { InputCreateCourse } from "./InputCreateCourse/InputCreateCourse";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate()


  const NotLogin = () => {
    navigate('/notlogin')
  }


    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };

    useEffect(() => {
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
        .catch(error => console.error('Error fetching data:', error));
    }, [])



    return (
        <div>
            <HeaderMegaMenu/>
            

            <div>
              <Container>
                <InputCreateCourse/>
              </Container>
            </div>


            <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
        </div>

        
    );
};

export default CreateCourse;
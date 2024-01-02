import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper, Container } from "@mantine/core";
import { InputCreateCourse } from "./InputCreateCourse/InputCreateCourse";


const CreateCourse = () => {


    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };



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
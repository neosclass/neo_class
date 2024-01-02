import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";
import { InputFindCourse } from "./InputWithButtons/InputFindCourse";
import { Container } from "@mantine/core";




const FindCourse = () => {

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
                  <InputFindCourse/>
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

export default FindCourse;
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper } from "@mantine/core";
import { TableOfCourses } from "./TableOfCOurses/TableOfCourses";
import { Container } from "@mantine/core";

const AllPrivateCourses = () => {

    
    const containerStyles = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      };



    return (
        <div>
            <HeaderMegaMenu/>

            <div>
                <Container fluid>
                    <TableOfCourses/>
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

export default AllPrivateCourses;
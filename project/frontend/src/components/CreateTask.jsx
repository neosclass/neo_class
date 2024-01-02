import { HeaderMegaMenu } from './HeaderMegaMenu/HeaderMegaMenu';
import { FooterCentered } from './FooterCentered/FooterCentered';
import { Paper } from "@mantine/core";
import { InputCreateTask } from './InputCreateTask/InputCreateTask';


function CreateTask() {
    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };
  

  
    return (

    <div>
        <HeaderMegaMenu/>

        <div>
          <InputCreateTask/>
        </div>

      <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
      </div>
    );
  };
  

  

export default CreateTask;
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Header from "./UI/header/Header";
import { HeaderMegaMenu } from "./HeaderMegaMenu/HeaderMegaMenu";
import { FooterCentered } from "./FooterCentered/FooterCentered";
import { Paper, Table } from "@mantine/core";
import { TableOfTasks } from "./TableOfTasks/TableOfTasks";

const TasksFromCourse = ({ match }) => {

    const containerStyles = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };



    return (
      <div>
          <HeaderMegaMenu/>

          <div>
            <TableOfTasks/>
          </div>

        <div>
                <Paper style={containerStyles}>
                    <FooterCentered/>
                </Paper>
            </div>
      </div>
    );
  };
  

export default TasksFromCourse;
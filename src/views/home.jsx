import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ParkingTable from "../components/parking/parkingTable";
import ParkingDialog from "../components/parking/parkingDialog";
import { getParkings } from "../services/firebase";
import { Box } from "@mui/system";

const Home = () => {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [parkings, setParkings] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getData = async () => {
    const result = await getParkings();
    setParkings(result);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [open, openRemove]);


  return (
    <> 
      <Card sx={{
        backgroundColor: '#fff',
      }}>
        <CardHeader width="24em" title={'Lista de registro de estacionamientos'} />
        <CardContent>
        <Typography variant="body1">Estacionamientos disponibles: {parkings.filter((p) => !p.busy).length}</Typography>
        { !email ? <Button variant="contained" onClick={() => {
          navigate('/login')
        }}> Iniciar sesion</Button> : '' }
          { email ? <Typography> Correo usuario: {email} </Typography> : '' }
          { email ? <Button sx={{ m: 1 }} variant="contained" onClick={() => handleLogout()}> Cerrar sesion</Button> : '' }
          { email ? <Button sx={{ m: 1 }} onClick={() => {
            setOpen(true)
          }} variant="contained"> Nuevo registro </Button> : '' }
          <Box align='center'>
            <ParkingTable parkings={parkings} openRemove={openRemove} setOpenRemove={setOpenRemove}/>
          </Box>
        </CardContent>
      </Card>
      <ParkingDialog open={open} setOpen={setOpen} parkings={parkings}/>
    </>
  );
};

export default Home
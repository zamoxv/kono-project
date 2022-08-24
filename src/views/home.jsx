import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from '@mui/material';

import { getParkings } from '../services/firebase';

const Home = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getParkings();
      setRows(result);
    }
    getData();
  }, []);

  return (
    <Card sx={{
      backgroundColor: '#fff',
    }}>
      <CardHeader width="24em" title={'Lista de registro de estacionamientos'} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Numero estacionamiento</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Inicio de uso</TableCell>
                <TableCell align="left">Termino</TableCell>
                <TableCell align="left">Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, id) => (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.number}</TableCell>
                  <TableCell align="left">{row.busy ? 'Ocupado' : 'Libre'}</TableCell>
                  <TableCell align="left">{row.start.toDate().toDateString()}</TableCell>
                  <TableCell align="left">{row.end.toDate().toDateString()}</TableCell>
                  <TableCell align="left">{row.user}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Home
import React, { useState, useEffect, Fragment } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';

import { useSelector } from 'react-redux';
import moment from "moment";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ParkingRemoveDialog from "./parkingRemoveDialog";

const ParkingTable = ({ parkings, openRemove, setOpenRemove }) => {
    const { email } = useSelector((state) => state.user);
    const [parking, setParking] = useState(0);

    return (
    <>
        <TableContainer sx={{ width: 1000 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Numero estacionamiento</TableCell>
                <TableCell align="left">Estado</TableCell>
                { email ? <TableCell align="left">Inicio de uso</TableCell> : ''}
                <TableCell align="left">Termino</TableCell>
                { email ? <TableCell align="left">Departamento</TableCell> : ''}
                { email ? <TableCell align="left">Patente</TableCell> : ''}
                { email ? <TableCell align="left">RUT</TableCell> : ''}
                <TableCell align="left">Usuario</TableCell>
                { email ? <TableCell align="center">Cerrar reserva</TableCell> : ''}
              </TableRow>
            </TableHead>
            <TableBody>
              {parkings?.sort((a, b) => a.number - b.number).map((row, id) => (
                <Fragment key={id}>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.number}</TableCell>
                  <TableCell align="left">{row.busy ? 
                  <CircleIcon color="error" /> : 
                  <CircleIcon color="success"/>}</TableCell>
                  { email ? <TableCell align="left">{row.start ? moment(row.start).format('DD/MM/yyyy hh:mm') : ''}</TableCell> : ''}
                  <TableCell align="left">{row.end ? moment(row.end).format('DD/MM/yyyy hh:mm') : ''}</TableCell>
                  { email ? <TableCell align="left">{row.appartment}</TableCell> : ''}
                  { email ? <TableCell align="left">{row.license_plate}</TableCell> : ''}
                  { email ? <TableCell align="left">{row.rut}</TableCell> : ''}
                  <TableCell align="left">{row.user}</TableCell>
                  { email ? <TableCell align="center">
                  <IconButton disabled={!row.busy} aria-label="delete" onClick={() => {
                    setOpenRemove(true)
                    setParking(row);
                  }}>
                    <Delete />
                  </IconButton>
                  </TableCell> : ''}

                </TableRow>
              </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ParkingRemoveDialog     
                      openRemove={openRemove}
                      setOpenRemove={setOpenRemove}
                      parking={parking} />
    </>
    );
};

export default ParkingTable;
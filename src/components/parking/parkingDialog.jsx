import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { reserveParking } from "../../services/firebase";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import emailjs from '@emailjs/browser';

const ParkingDialog = ({
    open,
    setOpen,
    parkings
}) => {
    const [parkingNumbers, setParkingNumbers] = useState([]);
    const [parking, setParking] = useState('');
    const [parkingNumber, setParkingNumber] = useState([]);
    const [start, setStart] = useState(moment());

    const validate = values => {
        const errors = {};
        if (!values.user) {
            errors.user = 'Debe ingresar el nombre';
        } else if (values.user.length < 3) {
            errors.user = 'Tiene que tener al menos 3 caracteres';
        }
        if (!values.appartment) {
            errors.appartment = 'Falta numero de departamento';
        }
        if (!values.license_plate) {
            errors.license_plate = 'Falta la patente';
        }
        if (values.hours < 1 || values.hours > 5) {
            errors.hours = 'Las horas deben ser mayor a 0 y menor a 5 horas';
        }
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(values.rut)) {
            errors.rut = 'Rut incorrecto'; 
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(values.email)) {
            errors.email = 'Email incorrecto';
        }
        return errors;
    };

    const fixDate = (date) => {
        const hour = moment(date).format('HH');
        const min = moment(date).format('MM');

        return `${hour}:${min}`;
      };
      

    const sendMail = (toSend) => {
        const templateParams = {
            to_name: toSend.user,
            mail: toSend.email,
            parking: toSend.parkingNumber.toString(),
            appartment: toSend.appartment.toString(),
            end: fixDate(toSend.end),
        }        
        emailjs.send("konoApp","template_r2fpkun", templateParams, "UTv9f0yFVTpB4pYr8", {});
    };

    const formik = useFormik({
        initialValues: {
            user: '',
            email: '',
            hours: 0,
            appartment: '',
            license_plate: '',
            rut: '',
            photo: '',
        },
        onSubmit: async (values) => {
            try {
                const toSend = { ...values, id: parking };
                toSend.start = moment(start.toString()).toString();
                toSend.end = moment(toSend.start).add(values.hours, 'hours').toString();
                delete toSend.hours;
                await reserveParking(toSend);
                toSend.parkingNumber = parkingNumber;
                sendMail(toSend);
                setOpen(false);
            } catch (error) {
                console.log(error);
            }
        },
        enableReinitialize: true,
        validate,
    });

    useEffect(() => {
        const getData = async () => {
            const numbers = parkings.filter((p) => !p.busy).map((p) => ({
                label: String(p.number),
                id: p.id,
            }));
            setParkingNumbers(numbers);
        }
        getData();
    }, [parkings]);

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>
                Nuevo registro de estacionamiento
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-numbers"
                                options={parkingNumbers}
                                onChange={(e, value) => {
                                    setParking(value.id);
                                    setParkingNumber(value.label);
                                }}
                                renderInput={(params) => <TextField {...params} label="Estacionamientos" />}
                            />
                            <TextField
                                label='Co-propietario'
                                onChange={formik.handleChange}
                                id='user'
                                name='user'
                            />
                            <Typography variant="string" color="error">{formik.errors.user}</Typography>
                            <TextField
                                label='RUT'
                                onChange={formik.handleChange}
                                id='rut'
                                name='rut'
                            />
                            <Typography variant="string" color="error">{formik.errors.rut}</Typography>

                            <TextField
                                label='Correo electronico'
                                onChange={formik.handleChange}
                                id='email'
                                name='email'
                            />
                            <Typography variant="string" color="error">{formik.errors.email}</Typography>
                            <TextField
                                label='Horas'
                                onChange={formik.handleChange}
                                id='hours'
                                name='hours'
                                type='number'
                                
                            />
                            <Typography variant="string" color="error">{formik.errors.hours}</Typography>
                            <TextField
                                label='Nº Departamento'
                                onChange={formik.handleChange}
                                id='appartment'
                                name='appartment'
                            />
                            <Typography variant="string" color="error">{formik.errors.appartment}</Typography>
                            <TextField
                                label='Patente'
                                onChange={formik.handleChange}
                                id='license_plate'
                                name='license_plate'
                            />
                            <Typography variant="string" color="error">{formik.errors.license_plate}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                            disabled={true}
                            label="Hora de inicio"
                            id='start'
                            name='start'
                            value={start}
                            onChange={(d) => setStart(d)}
                            renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </Stack>
                        <Button type="submit" autoFocus>
                            Guardar
                        </Button>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};



export default ParkingDialog;
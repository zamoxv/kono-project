import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { logout, setUser } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(email, password);
      if (data.success) {
        setError('');
        setIsLoading(false);
        dispatch(setUser(data.user));
        navigate('/');
      } else {
        setError(data.message);
      }

    } catch (error) {
      setError('Error al autenticar');
    }
  };

  

  return (
        <>
            <div className="login">
                <div className="login_container">
                    <h1>Inicio de sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="login_field">
                            <label htmlFor="email">Usuario</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="login_field">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="login_field">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isLoading}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="login_error">
                            {error}
                        </div>
                    </form>
                </div>
            </div>
        </>
  );
};

export default Login;

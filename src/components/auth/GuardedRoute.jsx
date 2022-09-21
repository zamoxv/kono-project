import { useSelector } from 'react-redux';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate  } from "react-router-dom";

const GuardedRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.user);

  return(uid ? <Fragment>{children}</Fragment> : <Navigate  to='/login' />)
}

GuardedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuardedRoute;

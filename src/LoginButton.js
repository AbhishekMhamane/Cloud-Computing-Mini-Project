import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" style={{marginTop:'2rem',
  fontWeight: 'bold'}}onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
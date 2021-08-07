import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Visibility, Email, Lock, VisibilityOff } from "@material-ui/icons";
import React, { useState, useRef, useContext} from "react";
import styled from "styled-components";
import { loginRequest } from "../api/Login";
import { AuthContext } from './../context/auth/AuthContext';
import { useHistory } from "react-router";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLoginAction = (e)=>{
      e.preventDefault();
      loginRequest({email:emailRef.current.value, password:passwordRef.current.value}, dispatch);
      history.push('/');
  }

  return (
    <LoginWrapper>
      <LoginTitle variant="h4">
        Login to <strong>Socila App</strong>
      </LoginTitle>
      <form onSubmit={ handleLoginAction }>
        <TextFieldInput
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          inputRef={ emailRef }
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextFieldInput
          type={showPassword ? "text" : "password"}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth
          required
          inputRef={ passwordRef }
          InputProps={{
         
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            
          }}
        />

        <LoginButton type="submit" variant="contained" color="primary">
          {
            isFetching ?<LoadingWrapperButton><LoadingIconButton size={20} /> Loading...</LoadingWrapperButton>  : "Login"
        }
        </LoginButton>
      </form>
      <LoginForgetPassword
        onClick={() => {
          setForgotPassword(!forgotPassword);
        }}
      >
        Forgot Password ?
      </LoginForgetPassword>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  background: #fbfbfb;
  border: 1px solid #ddd;
  height: 300px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  padding: 20px;
`;
const TextFieldInput = styled(TextField)`
  && {
    margin: 12px auto;
  }
`;

const LoginTitle = styled(Typography)`
  && {
    margin-bottom: 22px;
  }
`;

const LoginButton = styled(Button)`
  && {
    width: 60%;
    margin: 10px auto;
    display: flex;
  }
`;
const LoginForgetPassword = styled.p`
  && {
    text-align: center;
    color: #3f51b5;
    cursor: pointer;
    margin-top: 10px;
  }
`;

const LoadingWrapperButton = styled.div`
  display:flex;
  justify-items:center;
  align-items:center;
  &&{
    text-transform:lowercase;
  }

`;
const LoadingIconButton = styled(CircularProgress)`
  &&{
    margin-right:5px;
    color:white;
  }
`;
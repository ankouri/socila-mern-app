import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import {
  Visibility,
  Email,
  Lock,
  Person,
  VisibilityOff,
} from "@material-ui/icons";
import { Alert } from '@material-ui/lab';
import React, {  useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({"type":'', "msg":''});
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const rePasswordRef = useRef();

  const handleRegister = async(e)=>{
    e.preventDefault();

    if(passwordRef.current.value !== rePasswordRef.current.value){
        setMessage({type:"error", msg:"Password not match!! "});
    }else{
       const shortUsername = usernameRef.current.value.split(' ')
        const user = {
          username: shortUsername[0],
          email: emailRef.current.value,
          password:passwordRef.current.value
        }
        
        try{
          await axios.post("/api/auth/register", user);
          setMessage({type:"success",msg:"Yiiy! your account created successfully. Please login now! "})
        }catch(err){
          setMessage({type:"error",msg:"Oops! registering failed, please try again. "})
        }
      
    }

  }
  console.log(message.type);
  return (
    <RegisterWrapper>
    
      <RegisterTitle variant="h5">
        Create Account With <strong>Socila App</strong>
      </RegisterTitle>
    
      <form>
        {
          
          message.type === "error" 
          ? <MessageAlert severity="error">{ message.msg }</MessageAlert>
          : message.type === "success" 
          ? <MessageAlert severity="success">{ message.msg }</MessageAlert>
          : ''
        }
        <TextFieldInput
          type="text"
          id="outlined-basic"
          label="Username"
          inputRef={ usernameRef }
          variant="outlined"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextFieldInput
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          required
          inputRef={ emailRef }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextFieldInput
          type={showPassword ?"text" :  "password"}
          id="outlined-basic"
          label="Password"
          required
          variant="outlined"
          fullWidth
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

        <TextFieldInput
          type={showPassword ?"text" :  "password"}
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
          inputRef={ rePasswordRef }
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
       
        <RegisterButton onClick={ handleRegister } type="submit" variant="contained" color="primary">
          Create an account
        </RegisterButton>
      </form>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div` 
  background: #fbfbfb;
  border: 1px solid #ddd;
  height: 500px;
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

const RegisterTitle = styled(Typography)`
  && {
    margin-bottom: 22px;
  }
`;

const RegisterButton = styled(Button)`
  && {
    width: 60%;
    margin: 10px auto;
    display: flex;
  }
`;
const MessageAlert = styled(Alert)`
  &&{
    padding-top:5px;
    padding-bottom:5px;
    margin-bottom:6px;
  }
`;
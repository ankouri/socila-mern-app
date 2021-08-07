import React, { useState } from "react";
import styled from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const [register, setRegister] = useState(false);
  return (
    <AuthWrapper>
      {register ? <Register /> : <Login />}

      {register
        ? (<LinkPageWrapper>
            <LinkPageText> You already have an account?</LinkPageText>
            <LinkPage
              onClick={() => {
                setRegister(!register);
              }}
            >
              Login
            </LinkPage>
          </LinkPageWrapper>)
        : (
            <LinkPageWrapper>
             <LinkPageText>You don't have an account? </LinkPageText>
              <LinkPage
                onClick={() => {
                  setRegister(!register);
                }}
              >
                Register Now
              </LinkPage>
            </LinkPageWrapper>
        )}
   
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LinkPage = styled.p`
  && {
    margin-top: 20px;
    cursor:pointer;
    margin-left:4px;
    color:#3f51b5;
  }
`;
const LinkPageWrapper = styled.div`
    display:flex;
    align-items:center;

`;
const LinkPageText = styled.span`
    display:block;
    margin-top:20px;
`;

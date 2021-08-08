import React,{useContext, useEffect, useState, useRef } from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import ChatsOnlines from './Chats';
import { AuthContext } from './../context/auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
export default function Rightside() {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef(io("wss://socket-mern-app.herokuapp.com"));
    
    const handleOnlineUserHome = ()=>{
        history.push('/messanger');
    }

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users)=>{
          setOnlineUsers(
            user.followins.filter((f) => users.some((u) => u.userId === f))
          );
    
        });

    }, [user])
    
    return (
        <RightSideContainer>
            <Paper elevation={0}>
                <BirthDayContainer>
                    <BirthDayImage src="/assests/gift.png" alt="Birthday" />
                    <BirthDayText>
                        <b>You</b> and <b>3 others friends</b> have birthday today.
                    </BirthDayText>
                </BirthDayContainer>
                <ChatsOnlines onlineUsers= { onlineUsers } currentUserId={ user._id } setCurrentChat={ handleOnlineUserHome } />
            </Paper>
        </RightSideContainer>
    )
}

const RightSideContainer = styled.div`
    padding:20px;
`;
const BirthDayContainer = styled.div`
    display:flex;
    align-items:center;
`;
const BirthDayImage = styled.img`
    width:40px;
    height:40px;
    margin-right:8px;
`;
const BirthDayText = styled.span`
    font-size:16px;
`;
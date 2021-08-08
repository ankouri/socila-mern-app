import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { format } from 'timeago.js';
import axios from 'axios';

export default function Message({ message, own }) {
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
    
        const getUser = async() => {
          try{
            const res = await axios.get(`/api/users?userId=${message.sender}`);
            setCurrentChatUser(res.data);
          }catch(err){
            console.error(err);
          }
        }
        getUser();
  
      },[message]);
    return (
        <MessageWrapper style={ own ? { flexDirection:'column-reverse' } : {}}>
            <MessageAvatar
                style={ own ? { float:'right', marginTop:'-45px'} : {}}
                src={ PF + currentChatUser?.profilePicture }
                alt={ currentChatUser?.username }
            />
            <MessageContent >
            <MessageText style={ own ? { float:'right', marginRight:'43px',background:'rgb(147, 147, 157)'} : {}}>
                { message.text }
            </MessageText>
            <MessageInfo style={ own ? { display:"flex", flexDirection:'row-reverse', marginLeft:'-55px',marginTop:'3px' } : {}}>
                    { 
                        format(message.createdAt)
                    }
            </MessageInfo>
            </MessageContent>

        </MessageWrapper>
    )
}

const MessageWrapper = styled.div`
    width:auth;
    display:flex;
    align-items:flex-end;
`;

const MessageAvatar = styled(Avatar)``;
const MessageContent = styled.div`

`;
const MessageText = styled.div`
    background:#6f79a8;
    color:white;
    padding:8px;
    border-radius:10px;
    width:60%;
    margin-top:8px;
    line-height:1.5;
    margin-left:3px;
`;
const MessageInfo = styled.div`
    font-size:12px;
    color:#717171;
    width:100%;
    margin-left:6px;
    margin-top:2px;
    margin-bottom:20px;
`;

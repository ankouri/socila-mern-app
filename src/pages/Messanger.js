import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import {
  TextField,
  Container,
  Grid,
  InputBase,
  List,
  ListSubheader,
  Button,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import LastChats from "./../components/Messanger/LastChats";
import Message from "./../components/Messanger/Message";
import ChatsOnlines from "./../components/Chats";
import { AuthContext } from "./../context/auth/AuthContext";
import axios from "axios";
import HeaderMessage from './../components/Messanger/HeaderMessage';
import { Send } from '@material-ui/icons';
import io from 'socket.io-client';

export default function Messanger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const messageRef = useRef();
  const scrollRef  = useRef();
  const socket = useRef();

  const handleSubmitMessage = async(e) => {
    e.preventDefault()
    try{
        //CREATE MESSAGE OBJECT 
        const messageObj = {
            conversationId:currentChat._id,
            sender:user._id,
            text:messageRef.current.value
        }
        //FIND RECEIVER ID AND TRIGGER SOCKET SEND MESSAGE TO SEND MESSAGE OBJECT
        const receiverId = currentChat.members.find( member => member !== user._id);
        socket.current.emit('sendMessage',{
          senderId: user._id,
          receiverId,
          text:messageRef.current.value
        })

        //SAVE MESSAGE OBJECT TO DATABASE AND UPDATE MESSAGES STATE
        const res = await axios.post('/api/messages',messageObj);
        setMessages([...messages, res.data]);
        
    }catch(err){
        console.error(err); 
    }
    messageRef.current.value = '';
  }

  useEffect(() => {
    socket.current = io("wss://socket-mern-app.herokuapp.com");
    socket.current.on('getMessage', data => {
      setArrivalMessages({
        sender: data.senderId,
        text:data.text,
        createdAt: Date.now(),
      })
    });
  },[])

  useEffect(() => {
    console.log(arrivalMessages);
    arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) &&
    setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(()=>{
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users)=>{
      setOnlineUsers(
        user.followins.filter((f) => users.some((u) => u.userId === f))
      );

    });
  },[user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/${user?._id}`);
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
    const getMessages = async() =>{
      try{
        const res = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(res.data);
      }catch(err){
        console.error(err);
      }
    }
    getMessages();

    

  }, [user, currentChat?._id]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'});
  },[messages]);

  return (
    <MessangerWrapper>
      <Navbar />
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <MessangerLeftMenu>
              <MessangerHeaderMenu>
                <MessangerSearchWrapper>
                  <MessangerSearchIcon>
                    <Search />
                  </MessangerSearchIcon>
                  <MessangerInput
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </MessangerSearchWrapper>
              </MessangerHeaderMenu>
              <LastChatsWrapper>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheaderText
                      component="div"
                      id="nested-list-subheader"
                    >
                      Lastest Chats
                    </ListSubheaderText>
                  }
                >
              
                    {conversations.map((c, key) => {
                  return <div key={key} onClick={()=> setCurrentChat(c)} ><LastChats   conversation={c} currentUser={user} /></div>;
              })}
                </List>
              </LastChatsWrapper>
            
            </MessangerLeftMenu>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {
              currentChat ? <>
       
            <HeaderMessage currentChat={ currentChat } user={ user._id }/>
            <ConversationWrapper>
              {
                messages.map((message, key )=>{

                  return  <div  key={ key } ref={ scrollRef }  ><Message message={ message } own={ message.sender === user._id } /></div>
                })
              }

            </ConversationWrapper>
            <CreateMessageWrapper>
             <form onSubmit={ handleSubmitMessage }>
             
             <CreateMessageField
                id="outlined-multiline-static"
                multiline
                rows={1}
                placeholder="Write a message"
                variant="outlined"
                inputRef={ messageRef }
                />
                <SendButton
                    startIcon={
                        <Send/>
                    }
                    type="submit"
                    variant="contained"
                     color="primary"
                >
                    send
                </SendButton>
             </form>
        </CreateMessageWrapper>


            </> : <StartConversationMessage>
            Open a conversation to start chat!
            </StartConversationMessage> }
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <ChatsOnlines onlineUsers= { onlineUsers } currentUserId={ user._id } setCurrentChat={ setCurrentChat } />
          </Grid>
        </Grid>
      </Container>
    </MessangerWrapper>
  );
}

const MessangerWrapper = styled.div``;
const MessangerLeftMenu = styled.div`
  padding: 12px;
  height: 75vh;
  margin-top: 12px;
  border: 1px solid #ddd;
  overflow: hidden;
`;
const MessangerHeaderMenu = styled.div`
  text-align: center;
`;
const MessangerSearchWrapper = styled.div`
  margin-left: 0;
  width: 100%;
  position: relative;
  border-radius: 4px;
  border: 1px solid rgb(111, 121, 168);
`;
const MessangerSearchIcon = styled.div`
  padding: 4px 4px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  color: rgb(111, 121, 168);
`;
const MessangerInput = styled(InputBase)`
  color: rgb(111, 121, 168);
`;
const ConversationWrapper = styled.div`
  padding: 12px;
  height: 70vh;
  margin-top: 6px;
  border: 1px solid #ddd;
  overflow-y: scroll;
`;

const LastChatsWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &&::-webkit-scrollbar {
    display: none;
  }
`;
const ListSubheaderText = styled(ListSubheader)`
  background: #fff;
`;
const StartConversationMessage = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:80vh;
  font-size:33px;
  color:#6f79a8;
  font-family:'Roboto'

`;

const CreateMessageWrapper = styled.div`
    margin-top:8px;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
`;
const CreateMessageField = styled(TextField)`
    width:80%;
`;
const SendButton = styled(Button)`
    margin-left:15px;
    margin-top:18px;
    background:#6f79a8;
`;
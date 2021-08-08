import React, { useState,useEffect } from "react";
import styled from "styled-components";
import {
  Divider,
  Badge,
  Avatar,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import  axios  from 'axios';
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}))(Badge);

export default function ChatsOnlines({ onlineUsers, currentUserId, setCurrentChat}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleClickOnlineUser = async (user) =>{
    try{
      const res = await axios.get(`/api/conversations/find/${currentUserId}/${user._id}`)
      if(res.data !== null ){
        setCurrentChat(res.data);
      }else{
        const createCov = await axios.post(`/api/conversations`,{senderId:currentUserId, receiverId:user._id});
        console.log(createCov.data);
      }
      
    }catch(err){
      console.error(err);
    }
  }




  useEffect(()=>{
    const getFriends = async() =>{
      const res = await axios.get(`/api/users/friends/${currentUserId}`);
      setFriends(res.data);
    }
    getFriends();

  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  },[friends, onlineUsers])

  return (
    <ChatContainer>
      <ChatTitle>Online Friends : ({
          onlineFriends.length
        })</ChatTitle>
      <Divider />

      <MenuWrapper>
        {onlineFriends.map((user, key) => {
          return (
            <div key={ key }>
              <MenuItem button onClick={ () => {handleClickOnlineUser(user)} }>
                <ListItemIcon>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar alt={ user?.username } src={ PF+user?.profilePicture } />
                  </StyledBadge>
                </ListItemIcon>
                <Typography variant="h6" component="h6">
                { user?.username }
                </Typography>
              </MenuItem>
              <Divider />
            </div>
          );
        })}
      </MenuWrapper>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  margin-top: 20px;
  border:1px solid #ddd;
`;
const ChatTitle = styled.h4`
  padding: 10px;
`;

const MenuWrapper = styled(MenuList)`
  margin-top: 6px;
  min-height: 400px;
  padding:5px;
  height: 650px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &&::-webkit-scrollbar {
    display: none;
  }
`;

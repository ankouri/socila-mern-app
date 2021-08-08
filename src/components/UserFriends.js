import React, { useEffect, useState } from "react";
import { Typography, CardMedia } from "@material-ui/core";
import styled from "styled-components";
import { SupervisorAccount } from "@material-ui/icons";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserFriends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ friends, setFriends ] = useState([]);
  useEffect(()=>{
    const getFriendList = async()=>{
        try{
           const list = await axios.get('/api/users/friends/' + user._id);
           setFriends(list.data);
        }catch(err){
          console.log(err);
        }
    }
    getFriendList();
  },[user._id])
  return (
    <UserFriendsContainer>
      <UserFriendsHeader>
        <SupervisorAccount fontSize="small" />
        <UserFriendsTitle variant="h6">User Friends :</UserFriendsTitle>
      </UserFriendsHeader>
      <UserFriendsList>
        {
          friends.map((friend,key) => {
            return <Link key={key} to={`/profile/${friend.username}`}>
            <UserFriendsImage image={ PF+friend.profilePicture } title={ friend.username } />
            </Link>
          })
        }
        
      </UserFriendsList>
    </UserFriendsContainer>
  );
}

const UserFriendsContainer = styled.div`
  padding: 8px;
`;
const UserFriendsHeader = styled.div`
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 0px 0px 8px 0px;
`;
const UserFriendsTitle = styled(Typography)`
  margin-left: 6px;
  font-size: 16px;
`;
const UserFriendsImage = styled(CardMedia)`
  width: 30%;
  height: 85px;
  margin: 3px;
  display: inline-table;
`;

const UserFriendsList = styled.div`
  max-height: 500px;
  height: 500px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &&::-webkit-scrollbar {
    display: none;
  }
`;

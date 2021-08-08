import React,{ useContext, useState, useEffect } from "react";
import {List,ListSubheader,ListItem,ListItemIcon,ListItemText, Divider,Button } from "@material-ui/core";
import styled from "styled-components";
import { PersonOutline,DateRange,Add } from '@material-ui/icons';
import { AuthContext } from '../context/auth/AuthContext';
import axios from 'axios';

export default function UserInformations({ user }) {
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followins.includes(user?._id));

  const handleFollow = async()=>{
    try{
      if(followed){

        await axios.put("/api/users/"+user._id+"/unfollow",{userId: currentUser._id})
        dispatch({type:"UNFOLLOW", payload:user._id});
      }else{

        await axios.put("/api/users/"+user._id+"/follow",{userId: currentUser._id})
        dispatch({type:"FOLLOW", payload:user._id});

      }
    }catch(err){
      console.error(err);
    }
    setFollowed(!followed);
  }

  useEffect(()=>{
    setFollowed(currentUser.followins.includes(user?._id));
  },[currentUser, user._id])

  return (
    <USIContainer>
       {
                  currentUser.username !== user.username && (
                    <FollowButton fullWidth variant="contained" color="primary"
                    onClick={ handleFollow }
                      startIcon={
                        <Add/>
                      }
                    >
                      {
                        followed ? "Unfollow" : "Follow"
                      }</FollowButton>
                  )
                }
      <List
        component="ul"
        aria-labelledby="nested-list-subheader"
        subheader={
            
          <ListHeaderText component="div" id="nested-list-subheader">
            <ListHeaderIcon fontSize="small" />
            <span>User Informations :</span>
          </ListHeaderText>
        }
      >
        <ListItem>
          <ItemListIcon>
           <DateRange fontSize="small"/> 
          </ItemListIcon>
          Bithday :
          <ListTextItem primary={ user.birthDay } />
        </ListItem>
        <Divider />
        <ListItem>
          <ItemListIcon>
           <DateRange fontSize="small"/> 
          </ItemListIcon>
          City :
          <ListTextItem primary={ user.city } />
        </ListItem>
        <Divider />
        <ListItem>
          <ItemListIcon>
           <DateRange fontSize="small"/> 
          </ItemListIcon>
          From : 
          <ListTextItem primary={ user.from }/>
        </ListItem>
        <Divider />
        <ListItem>
          <ItemListIcon>
           <DateRange fontSize="small"/> 
          </ItemListIcon>
          Relationship : 
          <ListTextItem primary={ user.relationShip === 1 ? 'Single' :  user.relationShip === 2 ? 'Married ' :  '' } />
        </ListItem>
        <Divider />
        
      
      </List>
    </USIContainer>
  );
}
const USIContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const ListHeaderText = styled(ListSubheader)`
    font-size: 16px;
    display: flex;
    justify-content: start;
    align-items: center;
`;

const ListHeaderIcon = styled(PersonOutline)`
     margin-right:5px;   
`;
const ItemListIcon = styled(ListItemIcon)`
     min-width:25px;
`;

const ListTextItem = styled(ListItemText)`
    margin-left:10px;
`;
const FollowButton = styled(Button)`
 &&{
      background:#6f79a8;
  }

`;
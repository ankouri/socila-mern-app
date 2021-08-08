import React, { useState, useEffect } from "react";
import {
  ListItem,
  Divider,
  ListItemIcon,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";
import Skeleton from "../Skeleton/skeleton";

export default function LastChats({ conversation, currentUser }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    setLoading(true);
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
    setLoading(false);
  }, [currentUser, conversation]);
  return (
    <>
      {loading ? (
        <Skeleton type="lastChats"/>
      ) : (
        <>
          <ListItem button>
            <ListItemIcon>
              <Avatar src={PF + user.profilePicture} alt={user.username} />
            </ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItem>
          <Divider />
        </>
      )}
    </>
  );
}

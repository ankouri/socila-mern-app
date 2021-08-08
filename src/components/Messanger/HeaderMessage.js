import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import axios from "axios";

export default function HeaderMessage({ currentChat, user }) {
  const [info, setInfo] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const userId = currentChat?.members.find((e) => e !== user);
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${userId}`);
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [currentChat, user]);

  return (
    <ConversationHeader>
      {info && (
        <>
          <Avatar src={PF + info.profilePicture} alt={ info.username } />
          <UserNameHeader>{ info.username }</UserNameHeader>
        </>
      )}
    </ConversationHeader>
  );
}
const ConversationHeader = styled.div`
  padding: 2px;
  margin-top: 10px;
  margin-left: 10px;
  background: #fff;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const UserNameHeader = styled.div`
  margin-left: 8px;
`;

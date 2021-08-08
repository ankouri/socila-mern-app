import React, { useState, useEffect, useContext } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import Share from "./Share";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "./../context/auth/AuthContext";
import { PostContext } from "./../context/post/PostContext";
import Skeleton from "./Skeleton/skeleton";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { isFetching } = useContext(PostContext);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get(`/api/posts/timeline/${user._id}`);
      setPosts(res.data);
      setLoading(false);
      setDeleted(false);
    };
    fetchData();
  }, [username, user._id, isFetching,deleted]);
  return (
    <FeedContainer>
      <Paper elevation={0}>
        {username ? user.username === username ? <Share /> : "" : <Share />}
        {loading
          ? <Skeleton type="feed"/>
          : posts.map((post, key) => {
              return <Post key={key} post={post} setDeleted={ setDeleted } deleted={ deleted }/>;
            })}
      </Paper>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  scroll-behavior:smooth;
  padding: 20px;
  height: 85vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &&::-webkit-scrollbar {
    display: none;
  }
`;

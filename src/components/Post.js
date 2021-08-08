import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
  CardActions,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert, ExpandLess, ExpandMore } from "@material-ui/icons";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./../context/auth/AuthContext";

export default function Post({ post, setDeleted, deleted }) {
  const [voteUp, setVoteUp] = useState(post.votesUp.length);
  const [voteDown, setVoteDown] = useState(post.votesDown.length);
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const handleVoteUp = async () => {
    try {
      await axios.put(`/api/posts/${post._id}/voteup`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setVoteUp(isVotedUp ? voteUp - 1 : voteUp + 1);
    setIsVotedUp(!isVotedUp);
  };

  const handleVoteDown = async () => {
    try {
      await axios.put(`/api/posts/${post._id}/votedown`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setVoteDown(isVotedDown ? voteDown - 1 : voteDown + 1);
    setIsVotedDown(!isVotedDown);
  };

  const handleDeletePost = async () => {

      try{
        await axios.delete('/api/posts/'+post._id+'/'+currentUser._id);
        setDeleted(true);
      }catch(err){
        console.error(err);
      }
  }

  useEffect(() => {
    setIsVotedUp(post.votesUp.includes(currentUser._id));
    setIsVotedDown(post.votesDown.includes(currentUser._id));
  }, [currentUser._id, post.votesUp, post.votesDown]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchData();
  }, [post.userId]);


  const handleClose = () =>{
    setAnchorEl(null);
  }

  return (
    <PostWrapper>
      <PostCard>
        <CardHeader
          avatar={
            <Link to={`/profile/${user.username}`}>
              <Avatar src={PF + user.profilePicture} alt={user.username} />
            </Link>
          }
          title={<Link to={`/profile/${user.username}`}>{user.username}</Link>}
          subheader={format(post.createdAt)}
          action={
            currentUser._id === post.userId ?
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVert />
              </IconButton> : ''
          }
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ vertical: 'top', horizontal: 'center',}}
        >
          <MenuItem onClick={ handleDeletePost }>Delete Post</MenuItem>
        </Menu>
        <CardContent>
          <PostText>{post?.desc}</PostText>
          <PostImage image={PF + post.img} title={post.desc} />
        </CardContent>
        <PostActions>
          <VoteButton onClick={handleVoteUp}>
            <ExpandLess /> {voteUp}{" "}
          </VoteButton>
          <VoteButton onClick={handleVoteDown}>
            <ExpandMore /> {voteDown}{" "}
          </VoteButton>
        </PostActions>
      </PostCard>
    </PostWrapper>
  );
}
const PostWrapper = styled.div`
  margin-top: 15px;
`;
const PostCard = styled(Card)``;
const PostImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
`;
const PostActions = styled(CardActions)`
  display: flex;
  justify-content: space-around;
  padding: 10px 16px;
`;
const VoteButton = styled(Button)`
  font-weight: bold;
  width: 100%;
`;
const PostText = styled.span`
  padding: 5px;
  margin-top: -20px;
  margin-bottom: 10px;
  display: block;
`;

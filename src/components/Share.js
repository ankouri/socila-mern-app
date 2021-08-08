import React, {useContext, useRef, useState} from "react";
import {
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import styled from "styled-components";
import { PermMedia, Loyalty, LocationOn, TagFaces, Cancel,  } from "@material-ui/icons";
import { AuthContext } from './../context/auth/AuthContext';
import axios from 'axios';
import { PostContext } from './../context/post/PostContext';
import { sharePost } from './../api/SharePost';
import ShareIcon from '@material-ui/icons/Share';
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const postDescRef = useRef();
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const { isFetching, dispatch } = useContext(PostContext);
  const handleCreatePost = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: postDescRef.current.value,
    }
    //IF THERE IS A FILE IN THE NEW POST 
    //CREATE NEW FORMDATA AND ADD IMAGE TO THE 
    //NEW POST AND UPLOAD FORMDATA TO PUBLIC FOLDER
    if(file){ 
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try{
        await axios.post('/api/upload', data);
      }catch(err){
        console.error(err);
      }
    }
    //SEND NEW POST 
    try{
      
      await sharePost(newPost, dispatch);
      setResponse("Your post has been published.");
      //CLEAR FORM
      postDescRef.current.value='';
      setFile(null);
      setTimeout(()=> setResponse(''), 2000);
      
    }catch(err){
      console.error(err);
    }
  }
  return (
    <ShareContainer>
      <Card>
        <CardContent>

          <form onSubmit={ handleCreatePost }>
          <PostContainer>
            <PostAvatar src={ PF+user.profilePicture } alt={ user.username } />
            <PostField
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              placeholder={`What's in your mind ${user.username }?`}
              type="text"
              multiline
              inputRef={ postDescRef }
              rows={4}
            />
            {
             file && 
             <CardContent style={{width:'100%',margin:'0 auto'}}>
              <IconButton onClick={()=> setFile(null) }><Cancel/></IconButton>
              <PostImage image={ URL.createObjectURL(file) } title="" />
            </CardContent>
            }
          </PostContainer>
          <PostFooter>
            <PostActions>
            <label htmlFor="file">
              <CardButton component="span" startIcon={<ImageVideoIcon />}>
                
                Photo
                <input type="file" style={{display:"none"}} id="file" accept=".jpg,.png,.jpeg" onChange={(e)=>setFile(e.target.files[0])} />
               
              </CardButton>
              </label>
              <CardButton startIcon={<LoyaltyIcon />}>Tag</CardButton>
              <CardButton startIcon={<PinIcon />}>Location</CardButton>
              <CardButton startIcon={<FeelingIcon />}>Feeling</CardButton>
            </PostActions>
            <CardButtonActions disabled={ isFetching } type="submit" variant="contained" disableElevation={true} color="secondary">
                <ShareIcon fontSize="small" style={{ marginRight:'6px'}}/>
              Share
            </CardButtonActions>
          </PostFooter>
          </form>
        </CardContent>
      </Card>
      { response && 
        <ResponseArea  severity="info">{ response }</ResponseArea>
       }
    </ShareContainer>
  );
}

const ShareContainer = styled.div`
  margin-bottom:30px;
`;
const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 2px solid whitesmoke;
  margin-bottom: 8px;
`;

const PostAvatar = styled(Avatar)`
  & {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 1px solid whitesmoke;
  }
`;
const PostField = styled(TextField)`
  width: 90%;
  height: 100px;
  && {
    padding: 10px;
  }
  &::-webkit-input-placeholder{
      font-size:23px;
  }
`;
const CardButton = styled(Button)`
  font-weight: 600;
`;

const PostFooter = styled.div`
    display:flex;
    justify-content:space-between;
`;
const PostActions = styled.div`
    
`;
const CardButtonActions = styled(Button)`
    font-weight: 600;
    flex:1;
    max-width:100px;
    &&{
      background:#6f79a8;
    }
`;
const ImageVideoIcon = styled(PermMedia)`
  color: #595959;
`;

const LoyaltyIcon = styled(Loyalty)`
  color: #595959;
`;

const PinIcon = styled(LocationOn)`
  color: #595959;
`;
const FeelingIcon = styled(TagFaces)`
  color: #595959;
`;
const ResponseArea = styled(Alert)`
  margin-top:20px;
`;
const PostImage = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
`;
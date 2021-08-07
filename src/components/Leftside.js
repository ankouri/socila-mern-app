import React from "react";
import {
  Typography,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  Divider,
  Grid,
} from "@material-ui/core";
import { RssFeed, Chat, VideoLibrary,HelpOutline,Bookmarks } from "@material-ui/icons";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

export default function LeftSide() {
  const history = useHistory();
  return (
    <div>
      <Paper elevation={0}>
        <MenuList  style={{ border:'1px solid #ddd'}}>
          <MenuItem onClick={()=> history.push('/')}>
            <ListItemIcon>
              <RssFeed fontSize="medium" style={{color:'#6f79a8'}}/>
            </ListItemIcon>
            <Typography variant="h6" component="h6">Feed</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={()=> history.push('/messanger')}>
            <ListItemIcon>
              <Chat fontSize="medium" style={{color:'#6f79a8'}} />
            </ListItemIcon>
            <Typography variant="h6" component="h6">Chats</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <VideoLibrary fontSize="medium" style={{color:'#6f79a8'}} />
            </ListItemIcon>
            <Typography variant="h6" component="h6">Videos</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Bookmarks fontSize="medium" style={{color:'#6f79a8'}}/>
            </ListItemIcon>
            <Typography variant="h6" component="h6">Bookmarks</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <HelpOutline fontSize="medium" style={{color:'#6f79a8'}} />
            </ListItemIcon>
            <Typography variant="h6" component="h6">Questions</Typography>
          </MenuItem>
        </MenuList>
        <Divider />
        <ImageAd src="/assests/ad.png" />
        <Divider />
        <HelpLinks container alignItems="center">
        <MenuItem>Help </MenuItem>
        <MenuItem>Language </MenuItem>
        <MenuItem>Privacy Policy  </MenuItem>
        <MenuItem>Terms of use </MenuItem>
        </HelpLinks>
      </Paper>
    </div>
  );
}

const HelpLinks = styled(Grid)`
    margin-top:8px;

`;
const ImageAd = styled.img`
    width:100%;
    margin-top:8px;
    margin-bottom:8px;
`;
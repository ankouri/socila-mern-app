import React from "react";
import Navbar from "../components/Navbar";
import LeftSide from "../components/Leftside";
import Feed from "../components/Feed";
import Rightside from "./../components/Rightside";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PostContextProvider } from "../context/post/PostContext";

const useStyles = makeStyles((theme) => ({
    lfsd:{
        [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
    },
    feed:{
    },
    rtsd:{
        [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
    },
    container:{
        marginTop:'20px',
        
    }

}));


 
export default function Home() {
  const classes = useStyles();

  return (
    <PostContextProvider>
      <Navbar />
      <Container>
        <Grid container  justifyContent="center" className={ classes.container}>
          <Grid item lg={3} md={3} className={ classes.lfsd }>
            <LeftSide />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={ classes.feed }>
            <Feed />
          </Grid>
          <Grid item lg={3} md={3} className={ classes.rtsd }>
            <Rightside />
          </Grid>
        </Grid>
      </Container>
    </PostContextProvider>
  );
}

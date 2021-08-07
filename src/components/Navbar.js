import React, { useContext, useRef, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Container,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { Person, Search, Chat, Notifications, ExitToApp, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/auth/AuthContext";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  search:{
    position:"relative",
    color:'white',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#9fa8da', 0.15),
    "&:hover": {
      backgroundColor: alpha('#9fa8da', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      display: "block",
    }, 
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const profileRef = useRef();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleMenuState = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogOut = () => {
     dispatch({type:"LOGIN_START", payload:null});
     try{
      // Storage.clear();
      dispatch({type:"LOGIN_SUCCESS", payload:null});


     }catch(err){
      dispatch({type:"LOGIN_FAILED", payload:err});
     }
      
  }

  const handleProfileLink = ()=>{
    history.push(`/profile/${user.username}`);
  }

  const handleMessanger = ()=>{
    history.push(`/messanger`);

  }

  return (
    <NavbarWrapper>
      <AppBarMenu position="static" color="transparent" elevation={0}>
        <Container>
          <Toolbar>
            <LogoLink to="/">
              <LogoText variant="h6">Socila App</LogoText>
            </LogoLink>
            <NavbarWrapper />

            <SearchField className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </SearchField>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 3 new invitations" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <Person style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton aria-label="messanger" color="inherit" onClick={ handleMessanger }>
                <Badge badgeContent={0} color="secondary">
                  <Chat style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 5 new notifications" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <Notifications style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton
                ref={profileRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleMenuState}
              >
                <Avatar
                  src={PF + user.profilePicture}
                  alt={user.username}
                  width="32px"
                  height="32px"
                />
                <Popper
                  open={open}
                  anchorEl={profileRef.current}
                  role={undefined}
                  transition
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "top"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => {setOpen(false)}}>
                          <DropMenuProfile
                            autoFocusItem={open}
                            id="menu-list-grow"
                          >
                            <MenuItem onClick={ handleProfileLink }><PermIdentity fontSize="small" style={{ marginRight:'15px'}}/>Profile</MenuItem>
                            <MenuItem onClick={ handleLogOut }><ExitToApp fontSize="small" style={{ marginRight:'15px'}}/> Logout</MenuItem>
                          </DropMenuProfile>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBarMenu>
    </NavbarWrapper>
  );
}
const AppBarMenu = styled(AppBar)`
  && {
    background: #6f79a8;
  }
`;
const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const NavbarWrapper = styled.div`
  flex-grow: 1;
`;
const LogoText = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  display: block;
  font-family: "Roboto";
`;

const SearchField = styled.div``;
const DropMenuProfile = styled(MenuList)`
  &&{
    z-index:99;
  }
`;
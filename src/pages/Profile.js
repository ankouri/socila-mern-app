import {
  Container,
  Grid,
  CardMedia,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./../components/Navbar";
import LeftSide from "./../components/Leftside";
import Feed from "./../components/Feed";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import UserInformations from "./../components/UserInformations";
import UserFriends from "./../components/UserFriends";
import axios from "axios";
import { useParams } from "react-router";
import { Edit, Check } from "@material-ui/icons";
import Skeleton from "./../components/Skeleton/skeleton";
import ReactDOM from "react-dom";
const useStyles = makeStyles((theme) => ({
  lfsd: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  feed: {},
  rtsd: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    marginTop: "20px",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(false);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(false);
  const bioRef = useRef();
  //GET USERNAME FROM URL (PARAMETER)
  const username = useParams().username.toLowerCase();

  const handleChangeCover = async () => {
    const data = new FormData();
    const fileName = Date.now() + coverFile.name;
    data.append("name", fileName);
    data.append("file", coverFile);
    try {
      await axios.post("/api/upload", data);
      await axios.put(`/api/users/${user._id}`, {
        userId: user._id,
        coverPicture: fileName,
      });
      setCoverPreview(false);
      setCoverFile(null);
      setChanged(!changed);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangerProfileImg = async () => {
    const data = new FormData();
    const fileName = Date.now() + profileImg.name;
    data.append("name", fileName);
    data.append("file", profileImg);
    try {
      await axios.post("/api/upload", data);
      await axios.put(`/api/users/${user._id}`, {
        userId: user._id,
        profilePicture: fileName,
      });
      setProfileImgPreview(false);
      setProfileImg(null);
      setChanged(!changed);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChnageBio = () => {
    const TextareaEle = React.createElement(CustomTextarea, {
      rows: "1",
      cols: "20",
      placeholder: "Bio informations",
      defaultValue: user.desc ? user.desc : "",
      onBlur:validateBio,
    });
    ReactDOM.render(TextareaEle, document.getElementById("Bio"));
  };

  const validateBio = async(e) => {
    try {
      await axios.put(`/api/users/${user._id}`, {
        userId: user._id,
        desc: e.target.value,
      });
      setChanged(!changed);

    } catch (err) {

      console.error(err);

    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`/api/users?username=${username}`);
      setUser(res.data);
      setLoading(false);
    };
    fetchData();
  }, [username, user._id, changed]);

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container justifyContent="center" className={classes.container}>
          <Grid item lg={3} md={3} className={classes.lfsd}>
            <LeftSide />
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.feed}>
            <ProfileContainer>
              {loading ? (
                <Skeleton type="profile" />
              ) : (
                <>
                  <ProfileCover
                    image={
                      coverPreview
                        ? URL.createObjectURL(coverFile)
                        : user.coverPicture
                        ? PF + user.coverPicture
                        : PF + "nocover.jpg"
                    }
                    title="Cover picture"
                  >
                    <label htmlFor="file">
                      <EditCoverBtn component="span" htmlFor="file">
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="file"
                          accept=".jpg,.png,.jpeg"
                          onChange={(e) => {
                            setCoverFile(e.target.files[0]);
                            setCoverPreview(true);
                          }}
                        />

                        <Edit fontSize="small" color="" />
                      </EditCoverBtn>
                    </label>
                    {coverPreview ? (
                      <SaveCoverButton
                        onClick={handleChangeCover}
                        disableElevation
                        variant="contained"
                      >
                        Save
                      </SaveCoverButton>
                    ) : (
                      ""
                    )}
                  </ProfileCover>

                  <ProfileAvatar
                    src={
                      profileImgPreview
                        ? URL.createObjectURL(profileImg)
                        : user.profilePicture
                        ? PF + user.profilePicture
                        : "Picture"
                    }
                    alt="profile picture"
                  />
                  {profileImgPreview ? (
                    <SaveProfileBtn
                      component="span"
                      onClick={handleChangerProfileImg}
                    >
                      <Check fontSize="small" color="" />
                    </SaveProfileBtn>
                  ) : (
                    <label htmlFor="filepic">
                      <EditProfileBtn component="span" htmlFor="filepic">
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="filepic"
                          accept=".jpg,.png,.jpeg"
                          onChange={(e) => {
                            setProfileImg(e.target.files[0]);
                            setProfileImgPreview(true);
                          }}
                        />

                        <EditIconProfile fontSize="small" color="" />
                      </EditProfileBtn>
                    </label>
                  )}

                  <ProfileName>{user.username}</ProfileName>
                  <ProfileBio
                    id="Bio"
                    onDoubleClick={handleChnageBio}
                    ref={bioRef}
                  >
                    {user.desc ? user.desc : "Add bio informations"}
                    
                  </ProfileBio>
                </>
              )}
            </ProfileContainer>
            <Grid container>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Feed username={username} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <UserInformations user={user} />
                <UserFriends user={user} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 10px;
  margin-bottom: 100px;
`;

const ProfileCover = styled(CardMedia)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
  position: relative;
`;

const ProfileAvatar = styled(Avatar)`
  margin-top: -110px;
  border: 5px solid whitesmoke;
  width: 140px;
  height: 140px;
  margin-left: calc(50% - 70px);
`;

const ProfileName = styled.h4`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  margin-left: 8px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 5px;
`;

const ProfileBio = styled.h6`
  width: 100%;
  margin-left: 8px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;
  cursor:pointer;
`;

const EditCoverBtn = styled(IconButton)`
  margin-right: 15px;
  margin-top: 10px;
  float: right;
  && {
    color: #fff;
    background: #a7acc6;
  }
`;

const SaveCoverButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 15px;
  && {
    color: #fff;
    background: #6f79a8;
    padding: 8px 60px;
  }
`;
const EditIconProfile = styled(Edit)`
  position: relative;
`;

const EditProfileBtn = styled(EditCoverBtn)`
  margin-top: -16%;
  margin-right: 42%;
`;

const SaveProfileBtn = styled(EditProfileBtn)`
  && {
    background: green;
  }
`;

const CustomTextarea = styled.textarea`
  height: 20px;
  max-height: 20px;
  border:1px dashed #a7acc6;
`;

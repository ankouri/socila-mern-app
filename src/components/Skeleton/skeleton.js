import React from "react";
import { Paper, Divider } from "@material-ui/core";
import styled from "styled-components";

export default function Skeleton({ type }) {
  const ITEMS = 3;
  const PostSkeleton = () => (
    <PaperSkeleton>
      <PostHeaderSkeleton>
        <AvatarSketeleton />
        <HeaderInfoSkeleton>
          <AvatarTextSkeleton />
          <TimeSkeleton />
        </HeaderInfoSkeleton>
      </PostHeaderSkeleton>
      <PostContentSkeleton>
        <PostContentDesc />
        <PostContentImage />
      </PostContentSkeleton>
    </PaperSkeleton>
  );

  const LastChatSkeleton = () => (
    <>
      <ListItemSkeleton>
        <ListItemAvatar />
        <ListItemTextSkeleton />
      </ListItemSkeleton>
      <Divider />
    </>
  );

  const ProfileSkeleton = () => (
    <>
      <ProfileCoverImage /> 
      <ProfileUserImage  /> 
      <ProfileInformation>
       <ProfileUsername />
       <ProfileUserBio />
      </ProfileInformation>
      
    </>
  );

  if (type === "feed") return Array(ITEMS).fill(<PostSkeleton />);
  if (type === "lastChats") return <LastChatSkeleton />;
  if (type === "profile") return <ProfileSkeleton />;
}
const SkeletonTheme = styled.div`
  position: relative;
  overflow: hidden;
  background: #ccc9c9;
  &&:before {
    position: absolute;
    top: 0;
    left: -50%;
    z-index: 2;
    display: block;
    content: "";
    width: 68%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.11) 100%
    );
    transform: skewX(-25deg);
    animation: shine 1.5s infinite;
  }
  @keyframes shine {
    100% {
      left: 100%;
    }
  }
`;

const PaperSkeleton = styled(Paper)`
  padding: 18px;
  margin-top: 15px;
`;
const AvatarSketeleton = styled(SkeletonTheme)`
  width: 45px;
  height: 42px;
  border-radius: 50%;
`;
const PostHeaderSkeleton = styled.div`
  display: flex;
  flex-direction: revert;
`;
const HeaderInfoSkeleton = styled.div`
  width: 100%;
`;
const AvatarTextSkeleton = styled(SkeletonTheme)`
  width: 35%;
  height: 18px;
  margin-top: 3px;
  margin-left: 12px;
`;
const TimeSkeleton = styled(SkeletonTheme)`
  width: 20%;
  height: 10px;
  margin-top: 5px;
  margin-left: 12px;
`;

const PostContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContentDesc = styled(SkeletonTheme)`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PostContentImage = styled(SkeletonTheme)`
  width: 100%;
  height: 300px;
`;

const ListItemSkeleton = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
`;
const ListItemTextSkeleton = styled(SkeletonTheme)`
  width: 65%;
  height: 25px;
  margin-left: 15px;
`;

const ListItemAvatar = styled(SkeletonTheme)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileCoverImage = styled(SkeletonTheme)`
  width:100%;
  height:100%;
  position: relative;
`;
const ProfileUserImage = styled(SkeletonTheme)`
  width:140px;
  height:140px;
  margin-top:-110px;
  border-radius:50%;
  margin-left:calc(50% - 70px);
  border:3px solid whitesmoke;

`;
const ProfileInformation = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

`;
const ProfileUsername = styled(SkeletonTheme)`
  width:25%;
  height:20px;
  margin-bottom:10px;
  margin-top:10px;
`;
const ProfileUserBio = styled(SkeletonTheme)`
  width:25%;
  height:20px;
  margin-bottom:2px;
`;
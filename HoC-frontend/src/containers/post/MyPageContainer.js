import React, { useContext } from 'react';
import MyPage from '../../components/post/MyPage';
import { Auth, Post } from '../../contexts/store';

const MyPageContainer = () => {
  const { AuthState, AuthDispatch } = useContext(Auth);
  const { PostState, PostDispatch } = useContext(Post);
  console.log(PostState);
  console.log(AuthState);
  return <MyPage AuthState={AuthState} PostState={PostState} />;
};

export default MyPageContainer;

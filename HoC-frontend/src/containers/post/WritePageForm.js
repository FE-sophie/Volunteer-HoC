import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  AUTHSTATE_INPUT_VALUE,
  CHANGE_FIELD,
  POST_SUCCESS,
} from '../../contexts/write';
import { Auth, Post } from '../../contexts/store';
import Write from '../../components/post/Write';
import {
  CHECK_LOGIN,
  FILL_WRITE_INPUT,
  INITAILIZE_FORM,
} from '../../contexts/auth';
import { useState } from 'react';

const WritePageForm = ({ history, match, location }) => {
  console.log(location);
  const { AuthState, AuthDispatch } = useContext(Auth);
  const { PostState, PostDispatch } = useContext(Post);

  const post = async () => {
    console.log(PostState);
    const {
      title,
      body,
      address,
      periodStart,
      periodEnd,
      timeStart,
      timeEnd,
      gender,
      phoneNumber,
      number,
      companyName,
      email,
    } = PostState.posts;
    try {
      await axios.post('http://localhost:3000/api/posts', {
        title,
        body,
        address,
        periodStart,
        periodEnd,
        timeStart,
        timeEnd,
        gender,
        phoneNumber,
        number,
        companyName,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = e => {
    const { value, name } = e.target;
    PostDispatch({
      type: CHANGE_FIELD,
      key: name,
      value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    post();
    history.push('/');
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/auth/check/company');
      console.log('RESPONSE', response);
      await AuthDispatch({
        type: FILL_WRITE_INPUT,
        form: 'company',
        id: response.data._id,
        username: response.data.username,
        companyName: response.data.companyName,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email,
      });
      await PostDispatch({
        type: AUTHSTATE_INPUT_VALUE,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
        companyName: response.data.companyName,
        email: response.data.email,
      });
      await console.log(PostState);
    })();

    // const unblock = history.block('정말 나가시겠습니까?');
    return () => {
      PostDispatch({
        type: POST_SUCCESS,
      });
      // unblock();
    };
  }, []);

  return (
    <Write
      AuthState={AuthState}
      PostState={PostState}
      onChange={onChange}
      onSubmit={onSubmit}
      modalOpen={modalOpen}
      closeModal={closeModal}
      handlePrompt={handlePrompt}
      isLeave={isLeave}
      setIsLeave={setIsLeave}
    />
  );
};
export default withRouter(WritePageForm);

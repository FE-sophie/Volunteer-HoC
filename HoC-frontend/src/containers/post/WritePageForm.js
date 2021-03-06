import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {
  AUTHSTATE_INPUT_VALUE,
  CHANGE_FIELD,
  POST_SUCCESS,
  POST_FAIL,
  CANCEL_SUCCESS,
  CANCEL_FAIL,
} from '../../contexts/write';
import { Auth, Post } from '../../contexts/store';
import Write from '../../components/post/Write';
const WritePageForm = () => {
  const { AuthState } = useContext(Auth);
  const { PostState, PostDispatch } = useContext(Post);
  console.log(AuthState);
  console.log(PostState);


  const post = async () => {
    try {
    const response =  await axios.post(
      'http://localhost:3000/api/posts',
       {
          title: PostState.posts.title,
          body: PostState.posts.body,
          address: PostState.posts.address,
          periodstart: PostState.posts.periodstart,
          periodend: PostState.posts.periodend,
          gender:PostState.posts.gender,
          phoneNumber: PostState.posts.phoneNumber,
          number:PostState.posts.number,
          companyName:PostState.posts.companyName,
        }
      )
    console.log(response);
    

    } catch(error) {
      console.log(error);
    }
  }
  const onChange = e => {
    console.log(e.target.value);
    console.log(e.target.name);
    
    const {value, name} = e.target;
    PostDispatch({
      type:CHANGE_FIELD,
      key: name,
      value,
    });    
  };


  const onSubmit = async e => {
    e.preventDefault();
    post();
  };

  useEffect(() => {
    PostDispatch({
      type:AUTHSTATE_INPUT_VALUE,
      address: AuthState.company.address,
      companyName:AuthState.company.companyName,
      phoneNumber:AuthState.company.phoneNumber,
    })
  }, [])

  return <Write AuthState={AuthState} onChange={onChange} onSubmit={onSubmit}/>;
};
export default WritePageForm;





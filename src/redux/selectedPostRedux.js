import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getPost = ({selectedPost}) => selectedPost.data;
export const getLoading = ({selectedPost}, requestName) => selectedPost.requests[requestName];

// action name creator
const reducerName = 'selectedPost';
export const createActionName = (name) => `app/${reducerName}/${name}`;

// names of actions
export const START_REQUEST = createActionName('START_REQUEST');
export const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
export const REQUEST_ERROR = createActionName('REQUEST_ERROR');

export const LOAD_POST = createActionName('LOAD_POST');

// create actions

export const startRequest = (payload) => ({payload, type: 'START_REQUEST'});
export const requestSuccess = (payload) => ({payload, type: 'REQUEST_SUCCESS'});
export const requestError = (payload) => ({payload, type: 'REQUEST_ERROR'});

export const loadPost = (payload) => ({payload, type: 'LOAD_POST'});

// crate Tunks

export const loadPostRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest('get'));
    try {
      const response = await axios.get(API_URL + '/posts/' + id);
      dispatch(loadPost(response.data));
      dispatch(requestSuccess('get'));     

    } catch(err) {
      dispatch(requestError('get'));
    }
  };
};

// reducer

export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case 'LOAD_POST' : {
      return {
        ...statePart, data: action.payload,
      };
    }
    case 'START_REQUEST' : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: true, error: false}},
      };  
    }
    case 'REQUEST_SUCCESS' : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: false}},
      };
    }
    default : {
      return {...statePart};
    }
  }
  
};
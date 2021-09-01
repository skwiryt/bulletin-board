import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getPost = ({posts}, id) => posts.data.find(p => p.id === id);
export const getRequest = ({posts}, type) => posts.requests[type];

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const LOAD_POSTS = createActionName('LOAD_POSTS');
const ADD_POST = createActionName('ADD_POST');


/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const addPost = payload => ({payload, type: ADD_POST });

/* thunk creators */
export const loadPostsRequest = loadedPosts => {
  console.log('loadPostsRequest thunk is called, and !loadedPosts.length: ', !loadedPosts.length);
  if (typeof loadedPosts !== 'undefined' && !loadedPosts.length) {
    return async dispatch => {
      console.log('dispatch for fetch fired by Thunk');
      dispatch(requestStart('LOAD_POSTS'));
      try {
        const response = await axios.get(API_URL + '/posts');
        dispatch(loadPosts(response.data));
        dispatch(requestSuccess('LOAD_POSTS'));
        console.log('response.data: ', response.data);
      } catch(err) {
        // dispatch(requestError(err.message || true));
        dispatch(requestError('LOAD_POSTS'));
      }
    };
  } else {
    return dispatch => {
      dispatch(requestSuccess('LOAD_POSTS'));
    };
  }
};

export const addPostRequest = (formData) => {
  
  return async (dispatch) => {
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    dispatch(requestStart('ADD_POST'));
    try {
      const response = await axios.post(API_URL + '/posts', formData);
      dispatch(addPost(response.data));
      dispatch(requestSuccess('ADD_POST'));
    } catch (err) {
      dispatch(requestError('ADD_POST'));
    }
    
   
  };
};
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case LOAD_POSTS: {
      return {
        ...statePart,
        data: action.payload,
      };
    }
    case REQUEST_START : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: true, error: false}},
      };  
    }
    case REQUEST_SUCCESS : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: false}},
      };
    }
    case REQUEST_ERROR : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: true}},
      };
    }
    /*
    case REQUEST_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        // data: action.payload,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    */
    default:
      return statePart;
  }
};

export const initialState = {
  posts: {
    data: [],
    requests: {
      LOAD_POSTS: {
        active: false,
        error: false,
      },
      ADD_POST: {
        active: false,
        error: false,
      },
    },/*
    loading: {
      active: false,
      error: false,
    },*/
  },
  user: {
    loggedIn: true,
    id: '1234568',
    role: 'user',
  },
  //komentarz w komponencie Post.js
  /*
  selectedPost: {
    data: [],
    requests: {
      post: {
        active: false,
        error: false,
      },
      get: {
        active: false,
        error: false,
      },
    },
  },
  */
};

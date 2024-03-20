const SET_TOKEN = "SET_TOKEN";
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

const AuthInitialState = {
  token: null,
  refreshToken: null // Add refreshToken to the initial state
};

export const setToken = (token) => ({
  type: SET_TOKEN,
  token
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  refreshToken
});

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken
      };
    default:
      return state;
  }
};

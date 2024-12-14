// actions
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// initial state
const initialState = {
  isLoggedIn: !!localStorage.getItem('serviceToken'),
  isInitialized: true,
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
        isLoggedIn: true,
        isInitialized: true,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;

// ==============================|| ACTION CREATORS ||============================== //

export const register = (user) => ({
  type: REGISTER,
  payload: { user },
});

export const login = (user) => ({
  type: LOGIN,
  payload: { user },
});

export const logout = () => ({
  type: LOGOUT,
});

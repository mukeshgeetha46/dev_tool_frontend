// store.js
import { createStore, combineReducers } from 'redux';
import auth from './auth';  // Import your auth reducer

const rootReducer = combineReducers({
  auth
  // other reducers if needed
});

const store = createStore(rootReducer);

export default store;

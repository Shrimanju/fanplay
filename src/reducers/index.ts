import { combineReducers } from 'redux';
import auth from './auth';
import events from './events';
import profile from './profile';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import comments from './comments';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['events', 'profile'],
};

const rootReducer = combineReducers({
  auth,
  events,
  profile,
  comments,
});

// export default combineReducers({
//   auth,
//   events,
// });

export default persistReducer(persistConfig, rootReducer);

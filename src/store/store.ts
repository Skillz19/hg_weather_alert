import { configureStore } from '@reduxjs/toolkit';

import locationReducer from './reducers/locationsReducer';

const store = configureStore({
  reducer:  locationReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

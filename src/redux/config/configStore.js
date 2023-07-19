import { configureStore } from '@reduxjs/toolkit';
import userLocationReducer from '../modules/userLocation';
import reviewsReducer from '../modules/reviewSlice';

const store = configureStore({
  reducer: {
    location: userLocationReducer,
    reviews: reviewsReducer
  },
  devTools: process.env.BASE_URL !== 'production' // 개발 환경에서만 Redux DevTools를 활성화
});

export default store;

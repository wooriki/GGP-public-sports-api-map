import { configureStore } from '@reduxjs/toolkit';
import getPublicDataSlice from '../modules/publicData';
import userLocationReducer from '../modules/userLocation';
import setBoundarySlice from '../modules/maps/setBoundary';
import coordsGroupSlice from '../modules/maps/coordsGroup';
import reviewsReducer from '../modules/reviewSlice';

const store = configureStore({
  reducer: {
    getPublicData: getPublicDataSlice.reducer,
    location: userLocationReducer,
    setBoundary: setBoundarySlice.reducer,
    coordsGroup: coordsGroupSlice.reducer,
    reviews: reviewsReducer
  },
  devTools: process.env.BASE_URL !== 'production' // 개발 환경에서만 Redux DevTools를 활성화
});

export default store;

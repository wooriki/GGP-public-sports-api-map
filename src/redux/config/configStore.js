import { configureStore } from '@reduxjs/toolkit';
import getCurrentLocationSlice from '../modules/getCurrentLocation';
import getPublicDataSlice from '../modules/publicData';

const store = configureStore({
  reducer: { currentLocation: getCurrentLocationSlice.reducer, getPublicData: getPublicDataSlice.reducer },
  devTools: process.env.BASE_URL !== 'production' // 개발 환경에서만 Redux DevTools를 활성화
});

export default store;

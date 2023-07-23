import { configureStore } from '@reduxjs/toolkit';
import getPublicDataSlice from '../modules/publicData';
import userLocationReducer from '../modules/userLocation';
import setBoundarySlice from '../modules/maps/setBoundary';
import coordsGroupSlice from '../modules/maps/coordsGroup';
import commentsSlice from '../modules/commentsSlice';
import save10LocationSlice from '../modules/maps/save10Location';
import shoulbMapReloadSlice from '../modules/maps/reloadMap';
import isLocationAllowedSlice from '../modules/maps/isLocationAllowed';
import chosenFacilitySlice from '../modules/chosenFacility';
import isFacilityChosenSlice from '../modules/maps/isFacilityChosen';

const store = configureStore({
  reducer: {
    getPublicData: getPublicDataSlice.reducer,
    location: userLocationReducer,
    setBoundary: setBoundarySlice.reducer,
    coordsGroup: coordsGroupSlice.reducer,
    comments: commentsSlice,
    '10 Location': save10LocationSlice.reducer,
    reloadMap: shoulbMapReloadSlice.reducer,
    isLocationAllowed: isLocationAllowedSlice.reducer,
    chosenFacility: chosenFacilitySlice.reducer,
    isFacilityChosen: isFacilityChosenSlice.reducer
  },
  devTools: process.env.BASE_URL !== 'production' // 개발 환경에서만 Redux DevTools를 활성화
});

export default store;

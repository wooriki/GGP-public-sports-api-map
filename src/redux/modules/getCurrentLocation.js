// 사용자의 좌표를 받아서 state.currentLocation에 저장하는 모듈입니다.
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  latitude: null,
  longitude: null
};

const content = {
  name: 'get current location!',
  initialState,
  reducers: {
    getCurrentLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      return { ...state, latitude, longitude };
    }
  }
};

const getCurrentLocationSlice = createSlice(content);

export default getCurrentLocationSlice;
export const { getCurrentLocation } = getCurrentLocationSlice.actions;

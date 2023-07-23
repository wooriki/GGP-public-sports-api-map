import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 남산타워 위치
  latitude: 37.551086,
  longitude: 126.988033
};

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  }
});

export const { setLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;

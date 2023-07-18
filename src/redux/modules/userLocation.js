import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 남산타워 위치
  lat: 37.551086,
  lng: 126.988033,
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;

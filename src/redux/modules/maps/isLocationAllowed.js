const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '위치 동의 여부 (Boolean)',
  initialState: null,
  reducers: {
    isLocationAllowed: (state, action) => {
      return action.payload;
    }
  }
};

const isLocationAllowedSlice = createSlice(content);

export default isLocationAllowedSlice;
export const { isLocationAllowed } = isLocationAllowedSlice.actions;

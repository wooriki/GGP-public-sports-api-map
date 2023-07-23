const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '위치 동의 여부 (Boolean)',
  initialState: false,
  reducers: {
    toggleIsFacilityChosen: (state, action) => {
      return action.payload;
    }
  }
};

const isFacilityChosenSlice = createSlice(content);

export default isFacilityChosenSlice;
export const { toggleIsFacilityChosen } = isFacilityChosenSlice.actions;

const { createSlice } = require('@reduxjs/toolkit');

const initialState = { boundary: null };

const content = {
  name: '여러 좌표를 종합하여 중앙에 잘 보여주기',
  initialState,
  reducers: {
    setBoundary: (state, action) => {
      return { ...state, boundary: action.payload };
    }
  }
};

const setBoundarySlice = createSlice(content);

export default setBoundarySlice;
export const { setBoundary } = setBoundarySlice.actions;

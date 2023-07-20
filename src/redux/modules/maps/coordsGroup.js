const { createSlice } = require('@reduxjs/toolkit');

const initialState = { data: [] };

const content = {
  name: '여러 좌표를 종합하여 스토어에 저장',
  initialState,
  reducers: {
    groupingCoords: (state, action) => {
      return { ...state, data: action.payload };
    }
  }
};

const coordsGroupSlice = createSlice(content);

export default coordsGroupSlice;
export const { groupingCoords } = coordsGroupSlice.actions;

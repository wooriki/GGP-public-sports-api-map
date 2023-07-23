const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '목록에서 선택한 시설의 정보를 스토어에 저장',
  initialState: null,
  reducers: {
    sendFacility: (state, action) => {
      return action.payload;
    }
  }
};

const chosenFacilitySlice = createSlice(content);

export default chosenFacilitySlice;
export const { sendFacility } = chosenFacilitySlice.actions;

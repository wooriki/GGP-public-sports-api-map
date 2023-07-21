const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '여러 좌표를 종합하여 스토어에 저장',
  initialState: {
    shoulbMapReload: 0
  },
  reducers: {
    reloadMap: (state, action) => {
      let num = state.shoulbMapReload;
      console.log(num);
      return { ...state, shoulbMapReload: ++num };
    }
  }
};

const shoulbMapReloadSlice = createSlice(content);

export default shoulbMapReloadSlice;
export const { reloadMap } = shoulbMapReloadSlice.actions;

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null
};

const content = {
  name: '공공데이터를 한 번에 불러와 스토어에 저장합니다.',
  initialState,
  reducers: {
    getPublicData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSortedData: (state, action) => {
      return { ...state, sortedData: action.payload };
    }, // Added reducer to store sorted data
  },
};

const getPublicDataSlice = createSlice(content);

export default getPublicDataSlice;
export const { getPublicData, setSortedData } = getPublicDataSlice.actions;

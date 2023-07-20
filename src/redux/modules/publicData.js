const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  '(ALL)coordsData': null
};

const content = {
  name: '공공데이터를 한 번에 불러와 스토어에 저장합니다.',
  initialState,
  reducers: {
    getPublicData: (state, action) => {
      return { ...state, data: action.payload };
    },
    setSortedData: (state, action) => {
      return { ...state, sortedData: action.payload };
    }, // Added reducer to store sorted data
    saveAllDataWithCoords: (state, action) => {
      const newCoordsData = action.payload.map((el) => {
        return {
          latitude: el.X,
          longitude: el.Y,
          id: el.SVCID,
          name: el.PLACENM,
          reservStatus: el.SVCSTATNM
        };
      });
      return { ...state, '(ALL)coordsData': newCoordsData };
    }
  }
};

const getPublicDataSlice = createSlice(content);

export default getPublicDataSlice;
export const { getPublicData, setSortedData, saveAllDataWithCoords } = getPublicDataSlice.actions;

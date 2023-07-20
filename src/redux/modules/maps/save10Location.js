const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '여러 좌표를 종합하여 스토어에 저장',
  initialState: { data: [] },
  reducers: {
    // 가져온 10개의 데이터에서 id와, 위도, 경도를 추출하여 스토어에 저장
    save10Location: (state, action) => {
      console.log(action.payload);
      const tempObj = action.payload.map((el) => {
        return {
          id: el.SVCID,
          longitude: el.X,
          latitude: el.Y,
          name: el.PLACENM,
          reservStatus: el.SVCSTATNM,
          reservURL: el.SVCURL,
          img: el.IMGURL
        };
      });

      return { ...state, data: tempObj };
    }
  }
};

const save10LocationSlice = createSlice(content);

export default save10LocationSlice;
export const { save10Location } = save10LocationSlice.actions;

const { createSlice } = require('@reduxjs/toolkit');

const content = {
  name: '여러 좌표를 종합하여 스토어에 저장',
  initialState: { data: [] },
  reducers: {
    // 가져온 10개의 데이터에서 id와, 위도, 경도를 추출하여 스토어에 저장
    save10Location: (state, action) => {
      const tempObj = action.payload.map((el) => {
        return {
          SVCID: el.SVCID,
          longitude: el.X,
          latitude: el.Y,
          name: el.PLACENM,
          reservStatus: el.SVCSTATNM,
          SVCURL: el.SVCURL,
          IMGURL: el.IMGURL,
          SVCNM: el.SVCNM,
          RCPTBGNDT: el.RCPTBGNDT,
          RCPTENDDT: el.RCPTENDDT,
          TELNO: el.TELNO,
          V_MIN: el.V_MIN,
          V_MAX: el.V_MAX,
          MAXCLASSNM: el.MAXCLASSNM,
          PLACENM: el.PLACENM,
          PAYATNM: el.PAYATNM,
          SVCSTATNM: el.SVCSTATNM
        };
      });

      return { ...state, data: tempObj };
    }
  }
};

const save10LocationSlice = createSlice(content);

export default save10LocationSlice;
export const { save10Location } = save10LocationSlice.actions;

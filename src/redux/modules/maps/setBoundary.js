const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const __setBoundray = createAsyncThunk('setBoundary', (payload, thunkAPI) => {
  console.log('payload:', payload);
  return payload;
});

const content = {
  name: '여러 좌표를 종합하여 중앙에 잘 보여주기',
  initialState: {
    boundary: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__setBoundray.fulfilled, (stateOfThisModule, action) => {
      stateOfThisModule.boundary = action.payload;
    });
  }
};

const setBoundarySlice = createSlice(content);

export default setBoundarySlice;

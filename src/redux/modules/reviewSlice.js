import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  // 슬라이스 이름
  name: 'review',

  // 슬라이스의 초기 상태를 빈 배열로 설정
  initialState: [],

  // 액션과 리듀서를 정의
  reducers: {
    setReviews: (state, action) => {
      // setReviews 액션이 발생했을 때, 전달된 데이터(action.payload)로 상태(state)를 업데이트
      return action.payload;
    },
    createReview: (state, action) => {
      // addReview 액션이 발생했을 때, 전달된 리뷰 데이터(action.payload)를 상태(state)에 추가
      state.push(action.payload);
    },
    removeReview: (state, action) => {
      // removeReview 액션이 발생했을 때, 전달된 리뷰 ID(action.payload)와 일치하지 않는 리뷰만 남기고 상태(state)를 업데이트
      return state.filter((review) => review.id !== action.payload);
    },
    updateRevieweview: (state, action) => {
      // updateReview 액션이 발생했을 때, 전달된 리뷰 데이터(action.payload)의 ID와 일치하는 리뷰를 찾아 업데이트
      // 업데이트된 리뷰는 전달된 리뷰 데이터(action.payload)로 대체
      return state.map((review) => (review.id === action.payload.id ? action.payload : review));
    }
  }
});

export const { setReviews, addReview, removeReview, updateReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

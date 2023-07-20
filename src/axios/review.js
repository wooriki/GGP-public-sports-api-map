import axios from 'axios';

// 조회
const getReviews = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 추가
const createReview = async (newReview) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews`, newReview);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 삭제
const removeReview = async (review) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews/${review.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 수정
const updateReview = async (review) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/reviews/${review.id}`, review);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getReviews, createReview, removeReview, updateReview };

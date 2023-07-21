import axios from 'axios';

// 조회
const getComments = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 추가
const createComment = async (newComment) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newComment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 삭제
const removeComment = async (comment) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${comment.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 수정
const updateComment = async (comment) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/comments/${comment.id}`, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getComments, createComment, removeComment, updateComment };

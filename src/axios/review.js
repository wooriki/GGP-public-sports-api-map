import axios from 'axios';

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

export { getReviews };

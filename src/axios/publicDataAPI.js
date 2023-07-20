import axios from 'axios';
import Facilities from '../components/Facilities';

export const PUBLIC_DATA_BASE_URL = process.env.REACT_APP_PUBLIC_DATA_API_BASE_URL;
export const PUBLIC_DATA_API_KEY = process.env.REACT_APP_SEOUL_API_KEY;

const api = axios.create({
  baseURL: `${PUBLIC_DATA_BASE_URL}/${PUBLIC_DATA_API_KEY}/json/ListPublicReservationSport`,
  timeout: 5000
});

export default api;

// 리액트 쿼리
export const getData = async (from, to) => {
  const res = (await api(`/${from}/${to}/`)).data.ListPublicReservationSport.row;
  return res;
};

export const getReservations = async () => {
  const response = await axios(
    `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000`
  );
  return response.data.ListPublicReservationSport.row;
};

export const getFacilitiesForPagination = async (maxPageItems, currentPage) => {
  const startIndex = (currentPage - 1) * maxPageItems + 1;
  const endIndex = currentPage * maxPageItems;
  const response = await axios(
    `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/${startIndex}/${endIndex}`
  );
  return response.data.ListPublicReservationSport.row;
};

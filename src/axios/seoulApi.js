import axios from 'axios';

export const getReservations = async (maxPageItems, currentPage) => {
  const startIndex = (currentPage - 1) * maxPageItems + 1;
  const endIndex = currentPage * maxPageItems;
  const response = await axios(
    `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/${startIndex}/${endIndex}`
  );
  return response.data.ListPublicReservationSport.row;
};

// // 종목별
// export const getSportTypeData = async () => {
//   console.log('종목별 정보 get');
//   const response = await axios(
//     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000/테니스장`
//   );
//   return response.data;
// };
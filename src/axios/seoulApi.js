// seoulApi.js
import axios from 'axios';

export const getReservations = async () => {
  console.log('예약정보 get');
  const response = await axios(
    `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000`
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

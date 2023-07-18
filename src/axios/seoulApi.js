import axios from "axios";

export const getReservations = async (maxPageItems, currentPage) => {
  console.log("예약정보 get")
  const startIndex = (currentPage - 1) * maxPageItems + 1;
  const endIndex = currentPage * maxPageItems;
  const response = await axios(`http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/${startIndex}/${endIndex}`);
  return response.data.ListPublicReservationSport.row;
};
// import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getReservations } from '../axios/publicDataAPI';

const Search = () => {
  const { data: reservations, isLoading } = useQuery(['reservations'], getReservations);

  console.log(reservations);

  if (isLoading) {
    return <div>데이터 가져오는 중</div>;
  }

  return (
    <div>
      {/* {reservations[0].AREANM} */}
      {reservations.map((item) => {
        return <div>{item.AREANM}</div>;
      })}
    </div>
  );
};

export default Search;

// const [state, setState] = useState(null);

// const fetchData = async () => {
//   const { data } = await axios.get();
//   // console.log('data', data);
//   setState(data);
// };
// useEffect(() => {
//   //db로부터 값 가져오기
// }, []);

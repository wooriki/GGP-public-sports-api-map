// import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import { getReservations } from '../axios/seoulApi';
import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  //선택된 항목들 상태관리
  const [selectedVal, setSelectedVal] = useState('');

  //항목 클릭시 selctedVal에 넣기 -> 마지막 값만 넣어줘야함.
  const onValueButtonClickHandeler = (e) => {
    e.preventDefault();
    setSelectedVal(e.target.value);
  };

  // //데이터 가져오기 (selectedVal넣어서)
  const { data, isLoading } = useQuery(['sports', selectedVal], async () => {
    if (selectedVal !== '') {
      const response = await axios.get(
        `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000/${selectedVal}`
      );
      return response.data;
    }
  });
  console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedVal !== '') {
  //       try {
  //         const response = await axios.get(
  //           `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000/${selectedVal}`
  //         );
  //         const data = response.data;
  //         console.log(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [selectedVal]);

  // const selectedVal = '골프장';

  // const { data: reservations, isLoading } = useQuery(['reservations'], getReservations);
  // console.log(reservations);

  if (isLoading) {
    return <div>데이터 가져오는 중</div>;
  }

  // let rows = reservations['ListPublicReservationSport']['row'];
  // rows.forEach((a) => {
  //   console.log(a['AREANM'], a['MINCLASSNM']);
  // });

  return (
    <div>
      {/* {reservations.map((item) => {
        return <div>{item.AREANM}</div>;
      })} */}
      <form action="">
        <input type="text" />
        <button>검색</button>
      </form>
      <div>
        <select name="sportsFacility" id="sportsFacility" onChange={onValueButtonClickHandeler}>
          <option value="">전체</option>
          <option value="골프장">골프장</option>
          <option value="농구장">농구장</option>
          <option value="다목적경기장">다목적경기장</option>
          <option value="테니스장">테니스장</option>
          <option value="배구장">배구장</option>
          <option value="배드민턴장">배드민턴장</option>
          <option value="야구장">야구장</option>
          <option value="족구장">족구장</option>
          <option value="축구장">축구장</option>
          <option value="체육관">체육관</option>
          <option value="풋살장">풋살장</option>
        </select>
        <button id="submit">Get Selected Values</button>
      </div>
      <br />
      <div>
        <button>구이름</button>
      </div>
    </div>
  );
};

export default Search;
// {/* 1. 버튼을 누르면 소분류명(종목) 값에 따라 불러오기.
//         - 검색창을 누른다 or hover -> 선택바가 보인다
//         - 소분류명(종목)을 선택해야 지역구명 나오게 한다
//         - 지역구명은 여러개 선택 가능하게 한다 (다중선택)
//         - 그럼 종목선택때는 셀렉트로 / 지역구 선택은 버튼 ?*/}

// const [state, setState] = useState(null);

// const fetchData = async () => {
//   const { data } = await axios.get();
//   // console.log('data', data);
//   setState(data);
// };
// useEffect(() => {
//   //db로부터 값 가져오기
// }, []);

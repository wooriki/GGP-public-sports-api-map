import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const Search = ({ setFilteredGlobalDataByArea, setGlobalSearch }) => {
  // 선택된 종목 상태관리
  const [selectedSports, setSelectedSports] = useState('');
  // 필터링된 지역 상태관리
  const [filteredDataByArea, setFilteredDataByArea] = useState([]);

  const [search, setSearch] = useState('');

  // 종목 클릭시 selectedSports에 넣기
  const onSportsButtonClickHandler = (e) => {
    e.preventDefault();
    setSelectedSports(e.target.value);
  };

  const onSearchClickHandler = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  // 지역구 클릭시 selectedArea에 넣기
  const onAreaButtonClickHandler = (e) => {
    const selectedArea = e.target.value; //송파구
    const filteredDataByArea = filteredData.filter((item) => item.AREANM === selectedArea);

    // 필터링된 데이터를 상태에 저장!!
    setFilteredGlobalDataByArea({
      selectedArea,
      selectedSports
    });
  };

  const onSearchFormHandler = (e) => {
    e.preventDefault();
    setGlobalSearch(search);
  };

  // 데이터 가져오기 (선택한 종목값 (selectedSports)넣어서)
  const { data: filteredData, isLoading } = useQuery(['sports', selectedSports], async () => {
    if (selectedSports !== '') {
      const response = await axios.get(
        `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/ListPublicReservationSport/1/1000/${selectedSports}`
      );
      return response.data.ListPublicReservationSport.row;
    }
    return [];
  });

  // filteredData 배열에 있는 객체들의 AREANM(지역구) 속성을 추출하여 dataArea 배열 생성하기
  const dataArea = filteredData?.map((item) => item.AREANM);

  // 중복된값 제거하고 새로운 배열로 변환하기 -> 해당 종목시설이 있는 지역구만 보여줌
  const filteredDataArea = [...new Set(dataArea)];

  if (isLoading) {
    return <div>데이터 가져오는 중</div>;
  }

  return (
    <SelectTag>
      <form onSubmit={onSearchFormHandler}>
        <input type="text" value={search} onChange={onSearchClickHandler} />
        <button>검색</button>
      </form>
      <div>
        <select name="sportsFacility" id="sportsFacility" onChange={onSportsButtonClickHandler}>
          <option value="">전체</option>
          <option value="골프장">골프장</option>
          <option value="농구장">농구장</option>
          <option value="다목적경기장">다목적경기장</option>
          <option value="테니스장">테니스장</option>
          <option value="배구장">배구장</option>
          <option value="배드민턴장">배드민턴장</option>
          <option value="야구장">야구장</option>
          <option value="족구장">족구장</option>
          <option value="축구장">축구장</option>a<option value="체육관">체육관</option>
          <option value="풋살장">풋살장</option>
        </select>
      </div>
      <br />
      {/* 게시물영역 */}
      <div>
        <h3>{selectedSports}</h3>
        {filteredDataArea.map((item) => (
          <span key={item}>
            <button value={item} onClick={onAreaButtonClickHandler}>
              {item}
            </button>
          </span>
        ))}
      </div>
    </SelectTag>
  );
};

export default Search;

const SelectTag = styled.div`
  display: flex;
  color: white;
`;

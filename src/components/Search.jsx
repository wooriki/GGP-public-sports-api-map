import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import axios from 'axios';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/modules/userLocation';
import { reloadMap } from '../redux/modules/maps/reloadMap';

const Search = ({ setFilteredGlobalDataByArea, setGlobalSearch }) => {
  const searchIconRef = useRef();
  const searchInputRef = useRef();
  const searchOptionRef = useRef();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  // 선택된 종목 상태관리
  const [selectedSports, setSelectedSports] = useState('');
  // 필터링된 지역 상태관리
  const [filteredDataByArea, setFilteredDataByArea] = useState([]);
  const [search, setSearch] = useState('');

  // 종목 클릭시 selectedSports에 넣기
  const onSportsButtonClickHandler = (e) => {
    e.preventDefault();
    setSelectedSports(e.target.value);
    setIsOptionSelected(true);
  };

  const onSearchClickHandler = (e) => {
    setSearch(e.target.value);
  };
  // 지역구 클릭시 selectedArea에 넣기
  const onAreaButtonClickHandler = (e) => {
    const selectedArea = e.currentTarget.getAttribute('value');
    const filteredDataByArea = filteredData.filter((item) => item.AREANM === selectedArea);
    setSearch('');
    setGlobalSearch('');
    setSelectedSports('');
    setIsOptionSelected(false);
    // 필터링된 데이터를 상태에 저장!!
    setFilteredGlobalDataByArea({
      selectedArea,
      selectedSports
    });
  };

  // RESET
  const searchResetClickHandler = () => {
    searchOptionRef.current.value = '전체';
    setSearch('');
    setSelectedSports('');
    setIsOptionSelected(false);
    setGlobalSearch(search);
    setFilteredGlobalDataByArea(null);
  };

  const onSearchFormHandler = (e) => {
    setSelectedSports('');
    setIsOptionSelected(false);
    setFilteredGlobalDataByArea(null);
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
      <StyledSearch>
        <div id="search-left-div">
          <img ref={searchIconRef} src="https://i.ibb.co/ZNzFRNv/icons8-search-50.png" alt="search icon" />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={onSearchClickHandler}
            onKeyDown={(e) => (e.key === 'Enter' ? onSearchFormHandler() : undefined)}
            placeholder="검색하기"
            onFocus={() => {
              searchIconRef.current.style.opacity = 0;
              searchInputRef.current.style.transform = 'translate(-30px)';
            }}
            onBlur={() => {
              searchIconRef.current.style.opacity = 1;
              searchInputRef.current.style.transform = 'translate(0px)';
            }}
          />
          <RestartAltIcon id="search-reset-icon" onClick={() => searchResetClickHandler()} />
        </div>
        <div id="search-divider"></div>
        <div id="search-right-div">
          <select
            ref={searchOptionRef}
            name="sportsFacility"
            id="sportsFacility"
            onChange={onSportsButtonClickHandler}
            defaultValue="전체"
          >
            <option value="전체" disabled>
              전체
            </option>
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
        </div>
      </StyledSearch>
      {isOptionSelected ? (
        <StyledSearchResult>
          <h2>{selectedSports}</h2>
          <div id="search-result-list-container">
            {filteredDataArea.map((item) => (
              <div className="search-result-list" key={item} value={item} onClick={onAreaButtonClickHandler}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </StyledSearchResult>
      ) : undefined}
    </SelectTag>
  );
};

export default Search;

const SelectTag = styled.div`
  display: flex;
  color: white;
  position: relative;
`;

const StyledSearch = styled.div`
  display: flex;
  border-radius: 7px;
  height: 45px;
  background-color: #181818;
  align-items: center;
  gap: 0.35rem;
  #search-reset-icon {
    opacity: 0.8;
    cursor: pointer;
  }
  #search-reset-icon:hover {
    opacity: 1;
  }
  #search-left-div {
    padding: 0 10px;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    }
    input {
      min-width: 200px;
      outline: none;
      border: none;
      padding: 5px;
      height: 40px;
      width: 100px;
      margin-left: 0.5rem;
      font-size: 0.95rem;
      font-weight: 500;
      color: #ddd;
      transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
      letter-spacing: 0.2px;
      background-color: #181818;
    }
  }
  #search-divider {
    width: 1.25px;
    height: 70%;
    border: 1px #777 solid;
  }
  #search-right-div {
    select {
      outline: none;
      border: none;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: #ddd;
      font-size: 0.9rem;
      background-color: #181818;
    }
  }
`;
const StyledSearchResult = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50px;
  right: 0;
  width: 120px;
  min-height: 50px;
  z-index: 2;
  border-radius: 10px;
  background-color: #181818;
  overflow: hidden;

  h2 {
    color: #ddd;
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 2px #ddd solid;
  }
  #search-result-list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* gap: 0.5rem; */
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    padding: 8px 0;
  }

  .search-result-list {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
  }
  .search-result-list:hover {
    background-color: #333;
  }
  .search-result-list p {
    color: #ddd;

    font-size: 0.93rem;
  }
`;

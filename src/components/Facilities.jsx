import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import useFetchPublicData from '../hooks/useFetchPublicData';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from '../redux/modules/publicData';
import { calDistance } from '../helper/calDistance';
import { Paging } from './Paging';
import { save10Location } from '../redux/modules/maps/save10Location';
import { sendFacility } from '../redux/modules/chosenFacility';
import { toggleIsFacilityChosen } from '../redux/modules/maps/isFacilityChosen';

const Facilities = ({ setFacility, filteredGlobalDataByArea, globalSearch }) => {
  // 선택된 지역과 스포츠 종목 변수 설정
  const selectedArea = filteredGlobalDataByArea?.selectedArea;
  const selectedSports = filteredGlobalDataByArea?.selectedSports;
  const [filteredData, setFilteredData] = useState([]);
  const [sliceData, setSliceData] = useState([]);
  const dispatch = useDispatch();
  const chosenFacility = useSelector((state) => state.chosenFacility);
  const isFacilityChosen = useSelector((state) => state.isFacilityChosen);
  // 상세 페이지로 이동하는 함수
  // 수정인: 김환훈
  // 추가로직: 상세 시설 정보는 맵과도 연동이 되어야하기 때문에 일단 기존의 state는 놔두고 새로 redux로 스토어에도 저장하게 하여 맵에서도 연동 가능하게 설정합니다.
  const navDetailPage = (facility) => {
    if (isFacilityChosen) {
      setFacility(facility);
      return;
    }
    setFacility(facility);
    dispatch(toggleIsFacilityChosen(true));
    dispatch(sendFacility(facility));
  };
  // 맵에서 핀 찍으면 isFacilityChosen가 true가 된다. Facilities 컴포넌트에서 isFacilityChosen를 구독하고, 핀을 찍으면 그 시설의 정보를 chosenFacility로 받아서 상세페이지를 자동으로 열어준다.
  useEffect(() => {
    if (isFacilityChosen) {
      navDetailPage(chosenFacility);
    }
  }, [isFacilityChosen, chosenFacility]);

  const location = useSelector((state) => state.location);
  const { data: publicData, isLoading, isError } = useFetchPublicData();

  // 검색 및 필터된 데이터 설정
  useMemo(() => {
    setFilteredData((prev) => {
      return !globalSearch
        ? filteredGlobalDataByArea
          ? publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports)
          : publicData || []
        : publicData?.filter(
            (data) =>
              (!selectedArea || data.AREANM === selectedArea) &&
              (!selectedSports || data.MINCLASSNM === selectedSports) &&
              (data.MINCLASSNM.includes(globalSearch) ||
                data.SVCNM.includes(globalSearch) ||
                data.AREANM.includes(globalSearch))
          ) || null;
    });
  }, [filteredGlobalDataByArea, globalSearch, publicData, selectedArea, selectedSports]);

  // 페이지네이션 관련 변수 및 state 선언
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredData?.length || null;
  const totalPage = Math.ceil((filteredData?.length || publicData?.length || 0) / itemsPerPage) || null;
  const [sortPublicDataByDis, setSortPublicDataByDis] = useState([]);

  // 거리 기준으로 데이터 정렬하는 부분
  useEffect(() => {
    const sortPublicDataByDis = [...filteredData].sort((a, b) => {
      const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
      const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
      return dx - dy; // 거리 값을 비교하여 정렬
    });

    setSortPublicDataByDis(sortPublicDataByDis);

    // 현재 페이지에 따라 보여줄 데이터 조각 설정
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sliceData = sortPublicDataByDis.slice(startIndex, endIndex);

    // 필터된 데이터들을 스토어에 저장
    dispatch(save10Location(sliceData));

    dispatch(setSortedData(sortPublicDataByDis));

    // Update the sliceData state
    setSliceData(sliceData);
  }, [dispatch, currentPage, itemsPerPage, filteredData, location, globalSearch]);

  // 로딩 중이면 로딩 메시지 출력
  if (isLoading) return <h3>로딩 중 입니다</h3>;

  // 에러가 발생하면 에러 메시지 출력
  if (isError) {
    return (
      <>
        <p>에러가 발생하였습니다</p>
        <p>{publicData?.error.toString()}</p>
      </>
    );
  }

  return (
    <StyledFacilitiesContainer>
      <Title>공공 체육 시설 예약 정보</Title>
      <SubTitlte>
        <p>총 {totalItems}개</p>
        <p>
          &nbsp;&nbsp; 현재 페이지 {currentPage}/{totalPage}
        </p>
      </SubTitlte>
      <StyledItemListBox>
        {sliceData.map((facility) => {
          const backgroundColor =
            facility.SVCSTATNM === '접수중'
              ? { backgroundColor: '#223060' }
              : facility.SVCSTATNM === '안내중'
              ? { backgroundColor: '#22562d' }
              : facility.SVCSTATNM === '예약마감'
              ? { backgroundColor: '#ae010f' }
              : facility.SVCSTATNM === '예약일시중지'
              ? { backgroundColor: '#111' }
              : facility.SVCSTATNM === '접수종료'
              ? { backgroundColor: '#111' }
              : null;
          return (
            <div className="facility-list" key={facility.SVCID} onClick={() => navDetailPage(facility)}>
              <span style={backgroundColor}>{facility.SVCSTATNM}</span>
              <img src={facility.IMGURL} alt="public health facility img" />
              <div className="facility-list-info">
                <h3>
                  {facility.AREANM} {facility.MINCLASSNM}
                </h3>
                <p>{facility.SVCNM}</p>
              </div>
            </div>
          );
        })}
      </StyledItemListBox>
      <div>
        <Paging currentPage={currentPage} totalItems={totalItems} setCurrentPage={setCurrentPage} />
      </div>
    </StyledFacilitiesContainer>
  );
};

export default Facilities;

const StyledFacilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #eee;
  background-color: #18191bdc;
  padding: 1rem;
  height: 100%;
`;
const Title = styled.h2`
  padding-top: 1.3rem;
  font-size: 1.2rem;
  font-weight: bold;
`;
const SubTitlte = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
`;

const StyledItemListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow: auto;
  height: 100%;
  padding: 1rem 0;

  .facility-list {
    position: relative;
    width: 90%;
    display: flex;
    background-color: #2e2e30;
    align-items: center;
    gap: 4px;
    border: 1px #404246 solid;
    border-radius: 5px;
    padding: 5px 8px;
    text-align: center;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    &:hover {
      transform: scale(1.02);
      background-color: #3b3d43;
    }
    &:active {
      transform: scale(0.98);
    }
    span {
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #ddd;
      color: #eee;
      padding: 3px 5px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 700;
      transform: translate(-8px, -8px);
    }
  }

  img {
    width: 20%;
    border-radius: 4px;
  }

  .facility-list-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 8px;

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #dadada;
      text-align: left;
    }
    p {
      font-size: 0.85rem;
      color: #b9bbc0;
      text-align: left;
      line-height: 1.2;
    }
  }
`;

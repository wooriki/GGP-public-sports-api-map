import { useEffect, useState } from 'react';
import useFetchPublicData from '../hooks/useFetchPublicData';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from '../redux/modules/publicData';
import { styled, keyframes } from 'styled-components';
import { calDistance } from '../helper/calDistance';
import { Paging } from './Paging';

const Facilities = ({ setFacility, filteredGlobalDataByArea, globalSearch }) => {
  const selectedArea = filteredGlobalDataByArea?.selectedArea;
  const selectedSports = filteredGlobalDataByArea?.selectedSports;

  const navDetailPage = (facility) => {
    setFacility(facility);
  };

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { data: publicData, isLoading, isError } = useFetchPublicData();

  // 페이지네이션 관련 변수 및 state 선언
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = !globalSearch
    ? filteredGlobalDataByArea
      ? publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports).length
      : publicData?.length || []
    : publicData?.filter(
        (data) =>
          (!selectedArea || data.AREANM === selectedArea) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
          (!selectedSports || data.MINCLASSNM === selectedSports) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
          (data.MINCLASSNM.includes(globalSearch) ||
            data.SVCNM.includes(globalSearch) ||
            data.AREANM.includes(globalSearch))
      ).length || null;

  const totalPage = !globalSearch
    ? filteredGlobalDataByArea
      ? Math.ceil(
          publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports).length /
            itemsPerPage
        )
      : Math.ceil(publicData?.length / itemsPerPage) || []
    : Math.ceil(
        publicData?.filter(
          (data) =>
            (!selectedArea || data.AREANM === selectedArea) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
            (!selectedSports || data.MINCLASSNM === selectedSports) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
            (data.MINCLASSNM.includes(globalSearch) ||
              data.SVCNM.includes(globalSearch) ||
              data.AREANM.includes(globalSearch))
        ).length / itemsPerPage
      ) || null;

  const [sortPublicDataByDis, setSortPublicDataByDis] = useState([]);

  useEffect(() => {
    // filteredGlobalDataByArea가 true이면 필터링된 데이터를 사용하고,
    // false이면 전체 데이터를 사용합니다.
    const filteredData = !globalSearch
      ? filteredGlobalDataByArea
        ? publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports)
        : publicData || []
      : publicData?.filter(
          (data) =>
            (!selectedArea || data.AREANM === selectedArea) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
            (!selectedSports || data.MINCLASSNM === selectedSports) && // 카테고리가 '전체'인 경우 검색어로 필터링하도록 변경
            (data.MINCLASSNM.includes(globalSearch) ||
              data.SVCNM.includes(globalSearch) ||
              data.AREANM.includes(globalSearch))
        ) || null;

    // 거리를 기준으로 데이터 정렬!
    const sortPublicDataByDis = [...filteredData].sort((a, b) => {
      const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
      const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
      return dx - dy; // 거리 값을 비교하여 정렬
    });

    setSortPublicDataByDis(sortPublicDataByDis);

    dispatch(setSortedData(sortPublicDataByDis));
  }, [dispatch, filteredGlobalDataByArea, publicData, selectedArea, selectedSports, location, globalSearch]);

  if (isLoading) return <h3>로딩 중 입니다</h3>;
  if (isError) {
    return (
      <>
        <p>에러가 발생하였습니다</p>
        <p>{publicData.error.toString()}</p>
      </>
    );
  }

  // 현재 페이지 위치에 따라 10개씩 보여줄 데이터
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sliceData = sortPublicDataByDis.slice(startIndex, endIndex);

  return (
    <>
      <StyledFacilitiesContainer>
        <Title>Reservation Data</Title>
        <StyledItemListBox>
          <SubTitlte>
            <p>총 {totalItems}개</p>
            <p>
              <br />
              현재 페이지 {currentPage}/{totalPage}
            </p>
          </SubTitlte>
          <UlTag>
            {sliceData.map((facility) => (
              <StyledItemBox key={facility.SVCID}>
                <LiTag onClick={() => navDetailPage(facility)}>
                  <TextTag>
                    <span>{facility.AREANM}</span> <span>{facility.MINCLASSNM}</span>
                  </TextTag>
                  <TextTag>{facility.SVCNM}</TextTag>
                </LiTag>
              </StyledItemBox>
            ))}
          </UlTag>
        </StyledItemListBox>
        <Paging currentPage={currentPage} totalItems={totalItems} setCurrentPage={setCurrentPage} />
      </StyledFacilitiesContainer>
    </>
  );
};

export default Facilities;

// const StLi = styled.li`
//   border: 1px solid black;
// `;
const StyledFacilitiesContainer = styled.div`
  width: 25%;
  height: 1000px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 0 30px 30px 0;
  padding: 20px 5px 20px 30px;
`;

const StyledItemListBox = styled.div`
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;
const SubTitlte = styled.div`
  margin: 10px 0;
`;

const StyledItemBox = styled.div`
  // width: 90%;

  margin: 0 auto;
  margin: 10px 0;
  // padding: 4px 10px;
  background-color: grey;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.025);
  }
  100% {
    transform: scale(1);
  }

`;
const UlTag = styled.ul`
  width: 90%;

  margin: 0 auto;
  height: 70px;
  color: white;
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;
const LiTag = styled.li`
  width: 90%;
  display: flex;
  justify-content: center;

  margin: 0 auto;
  margin-top: 10px;
  height: 70px;
  color: white;
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;
const TextTag = styled.p`
  text-align: center;
  // height: 20px;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  padding: 0 4px;
`;

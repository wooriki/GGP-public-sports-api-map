import { useEffect, useState } from 'react';

import useFetchPublicData from '../hooks/useFetchPublicData';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from '../redux/modules/publicData';
import { styled, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calDistance } from '../helper/calDistance';
import { Paging } from './Paging';

const Facilities = ({ setFacility, filteredGlobalDataByArea }) => {
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
  const totalItems = filteredGlobalDataByArea
    ? publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports).length
    : publicData?.length || null;
  const totalPage = filteredGlobalDataByArea
    ? Math.ceil(
        publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports).length /
          itemsPerPage
      )
    : Math.ceil(publicData?.length / itemsPerPage) || null;

  const [sortPublicDataByDis, setSortPublicDataByDis] = useState([]);

  useEffect(() => {
    // filteredGlobalDataByArea가 true이면 필터링된 데이터를 사용하고,
    // false이면 전체 데이터를 사용합니다.
    const filteredData = filteredGlobalDataByArea
      ? publicData?.filter((data) => data.AREANM === selectedArea && data.MINCLASSNM === selectedSports)
      : publicData || [];

    // 복사본을 만들어서 정렬합니다.
    const sortPublicDataByDis = [...filteredData].sort((a, b) => {
      const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
      const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
      return dx - dy; // 거리 값을 비교하여 정렬
    });

    setSortPublicDataByDis(sortPublicDataByDis);

    dispatch(setSortedData(sortPublicDataByDis));
  }, [dispatch, filteredGlobalDataByArea, publicData, selectedArea, selectedSports, location]);

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
        <h2>Reservation Data</h2>
        <StyledItemListBox>
          <p>총 {totalItems}개</p>
          <p>
            현재 페이지 {currentPage}/{totalPage}
          </p>
          <ul>
            {sliceData.map((facility) => (
              <StyledItemBox key={facility.SVCID}>
                <li onClick={() => navDetailPage(facility)}>
                  <p>
                    <span>{facility.AREANM}</span> <span>{facility.MINCLASSNM}</span>
                  </p>
                  <p>{facility.SVCNM}</p>
                </li>
              </StyledItemBox>
            ))}
          </ul>
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
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 0 20px 20px 0;
  padding: 20px 40px 30px;
`;

const StyledItemListBox = styled.div``;

const StyledItemBox = styled.div`
  width: 350px;
  height: 70px;
  text-align: center;
  margin: 0 auto;
  margin: 10px 0;
  padding: 10px;
  background-color: grey;
  color: white;
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

import { useEffect, useState } from 'react';

import useFetchPublicData from "../hooks/useFetchPublicData";
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from "../redux/modules/publicData";

import { calDistance } from "../helper/calDistance";
import { styled } from "styled-components";
import { Paging } from "./Paging";

const Facilities = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { data: publicData, isLoading, isError } = useFetchPublicData(1, 1000);

  // 페이지네이션 관련 변수 및 state 선언
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = publicData?.length;
  const totalPage = Math.ceil((publicData?.length) / itemsPerPage);

  // useFetchPublicData훅으로 불러온 api 데이터를 현재 사용자 위치와 가까운 순으로 정렬
const sortPublicDataByDis = publicData && [...publicData].sort((a, b) => {
  const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
  const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
  return dx - dy;
});

  useEffect(() => {
    dispatch(setSortedData(sortPublicDataByDis));
  }, [dispatch, sortPublicDataByDis]);

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
          <p>현재 페이지 {currentPage}/{totalPage}</p>
          <ul>
            {sliceData.map((facility) => (
              <StyledItemBox>
                <li key={facility.SVCID}>
                  <p><span>{facility.AREANM}</span> <span>{facility.MINCLASSNM}</span></p>                
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

const StyledFacilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const StyledItemListBox = styled.div`
`

const StyledItemBox = styled.div`
  width: 350px;
  height: 70px;
  margin: 5px;
  padding: 10px;
  background-color: grey;
  color: white;
  border-radius: 10px;
  
  display: flex;
  align-items: center;
`;

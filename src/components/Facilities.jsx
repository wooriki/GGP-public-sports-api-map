import { useState } from 'react';
import useFetchPublicData from '../hooks/useFetchPublicData';
import { useDispatch, useSelector } from 'react-redux';
import { styled, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { save10Location } from '../redux/modules/maps/save10Location';
import { calDistance } from '../helper/calDistance';

import { Paging } from './Paging';

const Facilities = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { data: publicData, isLoading, isError } = useFetchPublicData();
  // 페이지네이션 관련 변수 및 state 선언
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = publicData?.length;
  const totalPage = Math.ceil(publicData?.length / itemsPerPage);

  // useFetchPublicData훅으로 불러온 api 데이터를 현재 사용자 위치와 가까운 순으로 정렬
  const sortPublicDataByDis =
    publicData &&
    [...publicData].sort((a, b) => {
      const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
      const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
      return dx - dy;
    });

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

  dispatch(save10Location(sliceData));

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
                <li>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const StyledItemListBox = styled.div``;

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

const FacilityTag = styled.div`
  width: 450px;
  color: rgba(236, 236, 236, 0.89);
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 0 30px 30px 0;
  padding-bottom: 10px;
  margin: 4px;
`;
const TitleTag = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 10px;
  padding-top: 10px;
`;
const NowPage = styled.p`
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  font-weight: 600;
  border-radius: 30px;
  // margin: 10px 0;
  padding: 10px 0px;
  background-color: rgba(236, 236, 236);
  color: black;
  text-align: center;
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

const LiTag = styled.li`
  width: 80%;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 14px 6px;
  background-color: rgba(123, 123, 123, 0.733);
  text-align: center;
  line-height: 1.5;
  box-shadow: 10px 10px 20px rgba(39, 39, 39, 0.6);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(101, 101, 101, 0.933);
    color: rgba(236, 236, 236);
    font-weight: 600;
  }
`;

const BtnContainer = styled.div`
  margin: 20px 0 20px;
  display: flex;
  justify-content: center;
  gap: 4px;
`;
const Btn = styled.button`
  width: 20px;
  padding: 4px;
  border-radius: 4px;
  border: none;
  text-align: center;
  display: flex;
  justify-content: center;
  background-color: rgba(101, 101, 101, 0.933);
  color: white;
  box-shadow: 10px 10px 20px rgba(39, 39, 39, 0.6);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(196, 196, 196, 0.733);
    color: black;
  }
`;

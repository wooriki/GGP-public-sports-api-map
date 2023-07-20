import { useQuery, useQueryClient } from 'react-query';
import useFetchPublicData from '../hooks/useFetchPublicData';
import { getReservations } from '../axios/publicDataAPI';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from '../redux/modules/publicData';
import { calDistance } from '../helper/calDistance';
import { styled, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Facilities = () => {
  const navigate = useNavigate();

  const navDetailPage = (facility) => {
    navigate(`/${facility.SVCID}`, {
      state: {
        facility: facility
      }
    });
  };

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const { data: publicData, isLoading, isError } = useFetchPublicData();
  // 페이지네이션 관련 변수 및 state 선언
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = publicData?.length;
  const totalPage = Math.ceil(publicData?.length / itemsPerPage);

  if (isLoading) return <h3>로딩 중 입니다</h3>;
  if (isError) {
    return (
      <>
        <p>에러가 발생하였습니다</p>
        <p>{publicData.error.toString()}</p>
      </>
    );
  }

  // useFetchPublicData훅으로 불러온 api 운동시설 데이터를 현재 사용자 위치와 가까운 순으로 정렬
  const publicDataSortedByDis = publicData.sort((a, b) => {
    const dx = calDistance(location.longitude, location.latitude, a.X, a.Y);
    const dy = calDistance(location.longitude, location.latitude, b.X, b.Y);
    return dx - dy;
  });

  // useEffect(() => {
  //   dispatch(setSortedData(publicDataSortedByDis));
  // }, [dispatch, publicDataSortedByDis]);

  // 페이지네이션
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sliceData = publicDataSortedByDis.slice(startIndex, endIndex);

  const pageCount = Math.ceil(publicData.length / itemsPerPage);
  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(pageCount, startPage + pageRange - 1);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const onPreviousPageClick = () => {
    setCurrentPage((prev) => Math.max(prev - pageRange, 1));
  };

  const onNextPageClick = () => {
    setCurrentPage((prev) => Math.min(prev + pageRange, pageCount));
  };

  const onPageButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <FacilityTag>
        <TitleTag>Reservation Data</TitleTag>
        <div>
          <NowPage>현재 페이지 {currentPage}</NowPage>
          <p>총 시설 개수 {totalItems}개</p>
          <ul>
            {sliceData.map((facility) => (
              <LiTag key={facility.SVCID} onClick={() => navDetailPage(facility)}>
                {facility.AREANM} {facility.SVCNM}
              </LiTag>
            ))}
          </ul>
        </div>
        <BtnContainer>
          <Btn disabled={currentPage === 1} onClick={onPreviousPageClick}>
            ◀
          </Btn>
          {visiblePages.map((page) => (
            <Btn key={page} onClick={() => onPageButtonClick(page)} disabled={currentPage === page}>
              {page}
            </Btn>
          ))}
          <Btn disabled={currentPage === pageCount} onClick={onNextPageClick}>
            ▶
          </Btn>
        </BtnContainer>
      </FacilityTag>
    </>
  );
};

export default Facilities;

// const StLi = styled.li`
//   border: 1px solid black;
// `;

const StPageButtons = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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

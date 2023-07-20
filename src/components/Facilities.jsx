import { useQuery, useQueryClient } from 'react-query';
import useFetchPublicData from '../hooks/useFetchPublicData';
import { getReservations } from '../axios/publicDataAPI';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedData } from '../redux/modules/publicData';
import { calDistance } from '../helper/calDistance';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { save10Location } from '../redux/modules/maps/save10Location';

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
  const { data: publicData, isLoading, isError } = useFetchPublicData(1, 1000);

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
  // ================================
  // 수정자: 김환훈
  // sliceData를 스토어에 저장하는 로직
  dispatch(save10Location(sliceData));
  // ================================
  return (
    <>
      <div>Reservation Data</div>
      <div>
        <p>총 시설 개수 {totalItems}개</p>
        <p>
          현재 페이지 {currentPage}/{totalPage}
        </p>
        <ul>
          {sliceData.map((facility) => (
            <StLi key={facility.SVCID} onClick={() => navDetailPage(facility)}>
              {facility.AREANM} {facility.SVCNM}
            </StLi>
          ))}
        </ul>
      </div>
      <nav>
        <button disabled={currentPage === 1} onClick={onPreviousPageClick}>
          이전 페이지
        </button>
        {visiblePages.map((page) => (
          <StPageButtons key={page} onClick={() => onPageButtonClick(page)} disabled={currentPage === page}>
            {page}
          </StPageButtons>
        ))}
        <button disabled={currentPage === pageCount} onClick={onNextPageClick}>
          다음 페이지
        </button>
      </nav>
    </>
  );
};

export default Facilities;

const StLi = styled.li`
  border: 1px solid black;
`;

const StPageButtons = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

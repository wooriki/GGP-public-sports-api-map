import { useQuery, useQueryClient } from 'react-query';
import { getFacilitiesForPagination } from '../axios/publicDataAPI';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LastPage } from '@mui/icons-material';
import { styled, keyframes } from 'styled-components';

const Facilities = () => {
  const location = useSelector((state) => state.location);

  // 페이지네이션 관련 변수 및 state 설정
  const maxPageItems = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  useEffect(() => {
    for (let page = currentPage; page <= currentPage + 4; page++) {
      queryClient.prefetchQuery(['facilities', page], () => getFacilitiesForPagination(maxPageItems, page));
    }
  }, [currentPage, maxPageItems, queryClient]);

  const {
    isLoading,
    isFetching,
    data: facilities,
    isError,
    error
  } = useQuery(['facilities', currentPage], () => getFacilitiesForPagination(maxPageItems, currentPage), {
    refetchOnWindowFocus: false,
    staleTime: 2000,
    keepPreviousData: true
  });

  const onPreviousPageClick = () => {
    setCurrentPage((prev) => (Math.ceil(prev / 5) - 1) * 5 - 4);
  };

  const onNextPageClick = () => {
    setCurrentPage((prev) => Math.ceil(prev / 5) * 5 + 1);
  };

  const onPageButtonClick = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <h3>로딩 중 입니다</h3>;
  if (isError)
    return (
      <>
        <p>에러가 발생하였습니다</p>
        <p>{error.toString()}</p>
      </>
    );

  const pageNumbers = [1, 2, 3, 4, 5].map((page) => page + Math.floor((currentPage - 1) / 5) * 5);

  return (
    <>
      <FacilityTag>
        <TitleTag>Reservation Data</TitleTag>
        <NowPage>현재 페이지 {currentPage}</NowPage>
        <ul>
          {facilities.map((facility) => (
            <LiTag key={facility.SVCID}>
              {facility.AREANM} {facility.SVCNM}
            </LiTag>
          ))}
        </ul>
        <BtnContainer>
          <Btn disabled={currentPage <= 5} onClick={onPreviousPageClick}>
            ◀
          </Btn>
          {pageNumbers.map((page) => (
            <Btn key={page} onClick={() => onPageButtonClick(page)}>
              {page}
            </Btn>
          ))}
          <Btn disabled={currentPage <= LastPage} onClick={onNextPageClick}>
            ▶
          </Btn>
        </BtnContainer>
      </FacilityTag>
    </>
  );
};

export default Facilities;

const FacilityTag = styled.div`
  width: 450px;
  color: rgba(236, 236, 236, 0.89);
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 0 30px 30px 0;
  padding-bottom: 10px;
  margin-left: 4px;
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

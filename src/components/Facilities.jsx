import { useQuery, useQueryClient } from "react-query";
import { getReservations } from "../axios/seoulApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LastPage } from "@mui/icons-material";

const Facilities = () => {
  const location = useSelector((state) => state.location);

  // 페이지네이션 관련 변수 및 state 설정
  const maxPageItems = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  useEffect(() => {
    for (let page = currentPage; page <= currentPage + 4; page++) {
      queryClient.prefetchQuery(["facilities", page], () =>
        getReservations(maxPageItems, page)
      );
    }
  }, [currentPage, maxPageItems, queryClient]);

  const { isLoading, isFetching, data: facilities, isError, error } = useQuery(
    ["facilities", currentPage],
    () => getReservations(maxPageItems, currentPage),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
      keepPreviousData: true,
    }
  );

  const onPreviousPageClick = () => {
    setCurrentPage((prev) => (Math.ceil(prev/5) - 1)*5 - 4)
  }

  const onNextPageClick = () => {
    setCurrentPage((prev) => (Math.ceil(prev/5))*5 + 1)
  }

  const onPageButtonClick = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <h3>로딩 중 입니다</h3>;
  if (isError) return (
    <>
      <p>에러가 발생하였습니다</p>
      <p>{error.toString()}</p>
    </>
  )

  const pageNumbers = [1, 2, 3, 4, 5].map((page) => page + (Math.floor((currentPage - 1) / 5) * 5));

  return (
    <>
      <div>Reservation Data</div>
      <p>현재 페이지 {currentPage}</p>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.SVCID}>
            {facility.AREANM} {facility.SVCNM}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 5}
          onClick={onPreviousPageClick}>
          이전 페이지
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageButtonClick(page)}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage <= LastPage}
          onClick={onNextPageClick}>
          다음 페이지
        </button>
      </div>
    </>
  );
};

export default Facilities;
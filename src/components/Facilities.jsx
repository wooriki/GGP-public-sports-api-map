import { useQuery, useQueryClient } from "react-query";
import { getReservations } from "../axios/seoulApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Facilities = () => {
  const location = useSelector((state) => state.location);
  console.log("store에서 불러온 위치 => ", location);

  // 페이지네이션 관련 변수 및 state 설정
  const maxPageItems = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isFetching, data: facilities } = useQuery(
    ["facilities", location],
    () => getReservations(maxPageItems, currentPage)
  );

  if (isLoading || isFetching) return `로딩 중 입니다`;

  // 거리 계산 함수
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // 두 지점 사이의 거리 반환 (단위: km)
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // 현재 위치와 각 시설들과의 거리를 계산하여 정렬
  const sortFacilitiesByDistance = (facilities) => {
    return facilities
      .slice()
      .sort((a, b) => {
        const distanceA = calculateDistance(
          location.latitude,
          location.longitude,
          parseFloat(a.Y),
          parseFloat(a.X)
        );
        const distanceB = calculateDistance(
          location.latitude,
          location.longitude,
          parseFloat(b.Y),
          parseFloat(b.X)
        );

        return distanceA - distanceB;
      });
  };

  const sortedFacilities = sortFacilitiesByDistance(facilities);

  return (
    <>
      <div>Reservation Data</div>
      <ul>
        {sortedFacilities.map((facility) => (
          <li key={facility.SVCID}>
            {facility.AREANM} {facility.SVCNM}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Facilities;
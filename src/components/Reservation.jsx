import { useQuery, useQueryClient } from "react-query";
import { getReservations } from "../axios/seoulApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Reservation = () => {
  const location = useSelector((state) => state.location);
  console.log("store에서 불러온 위치 => ", location)

  const maxPageItems = 5
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isFetching, data: reservations } = useQuery(
    "reservations",
    ()=>getReservations(maxPageItems, currentPage),
  );
  const queryClient = useQueryClient();

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
  useEffect(() => {
    if (location && reservations) {
      const nearByFacilities = reservations
        .slice()
        .sort((a, b) => {
          const distanceA = calculateDistance(
            location.lat,
            location.lng,
            a.X,
            a.Y
          );
          const distanceB = calculateDistance(
            location.lat,
            location.lng,
            b.X,
            b.Y
          );

          return distanceA - distanceB;
        });

      // 업데이트된 nearByFacilities를 사용하거나 필요한 처리를 수행합니다.
    }
  }, [location, reservations]);

  if (isLoading || isFetching) return `로딩 중 입니다`;

  // 현재 위치와 각 시설들과의 거리를 계산하여 정렬
  const nearByFacilities = reservations
    .slice()
    .sort((a, b) => {
      const distanceA = calculateDistance(
        location.lat,
        location.lng,
        a.X,
        a.Y
      );
      const distanceB = calculateDistance(
        location.lat,
        location.lng,
        b.X,
        b.Y
      );

      return distanceA - distanceB;
    });

  return (
    <>
      <div>Reservation Data</div>
      <ul>
        {nearByFacilities.map((reservation) => (
          <li key={reservation.SVCID}>
            {reservation.AREANM} {reservation.SVCNM}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reservation;

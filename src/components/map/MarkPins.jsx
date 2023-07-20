import React, { useEffect } from 'react';
import { Marker, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import useSaveBoundary from '../../hooks/mapHooks/saveBoundary';

// 특정 좌표가 주어 졌을 때, 그 좌표들에 핀을 놓고,
// 좌표들이 모두 표시될 수 있는 위치에 맵을 보인다.

const MarkPins = ({ map, boundary }) => {
  const navermaps = useNavermaps();
  const fetchedgroup = useSelector((state) => state['10 Location'].data);

  // useSaveBoundary의 인자는 앞으로 가져올 데이터의 좌표들
  useSaveBoundary(fetchedgroup);
  //
  useEffect(() => {
    if (map && boundary) {
      map.panToBounds(boundary);
      if (map.getZoom() > 16) {
        map.setZoom(14, true);
      }
      console.log('zoom level:', map.getZoom());
    }
  }, [map, boundary]);
  return (
    <>
      {fetchedgroup?.map((location) => (
        <Marker key={location.id} position={new navermaps.LatLng(+location.latitude, +location.longitude)} />
      ))}
    </>
  );
};

export default MarkPins;

// 위도와 경도를 갖는 데이터로 요청 (+id값도 가져야함)
// 밑 pins 샘플 데이터
// const pins = [
//   { id: 0, longitude: 37.5601, latitude: 126.9501 },
//   { id: 1, longitude: 37.5667, latitude: 126.9784 },
//   { id: 2, longitude: 37.5567, latitude: 126.9884 },
//   { id: 3, longitude: 37.5667, latitude: 127.1 },
//   { id: 4, longitude: 37.667, latitude: 127.12 },
//   { id: 5, longitude: 37.4, latitude: 127.12 }
// ];

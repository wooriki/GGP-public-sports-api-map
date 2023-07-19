import { useEffect, useState } from 'react';
import { Container as useNavermaps } from 'react-naver-maps';

const useMoveToCoords = (map, setMap, coords) => {
  const navermaps = useNavermaps();
  const moveToTheCoords = (coords) => {
    // coords는 예시로 만든 좌표
    const targetLocation = new navermaps.LatLng(coords);
    if (map) {
      map.setCenter(targetLocation);
      map.setZoom(10, true);
    }
  };

  useEffect(() => {
    moveToTheCoords();
  }, []);
};

// export default useMoveToCoords;

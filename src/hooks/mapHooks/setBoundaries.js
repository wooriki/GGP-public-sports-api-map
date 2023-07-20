import { useNavermaps } from 'react-naver-maps';

//
const useSetBoundary = (pins) => {
  const navermaps = useNavermaps();

  let coordsMix = null;
  let boundaryMix = null;

  if (pins.length > 0) {
    coordsMix = pins.map(({ longitude, latitude }) => new navermaps.LatLng(longitude, latitude));

    // When the number of coordinates exceeds 4, create LatLngBounds step by step.
    boundaryMix = new navermaps.LatLngBounds(coordsMix[0], coordsMix[1]);
    for (let i = 2; i < coordsMix.length; i++) {
      boundaryMix.extend(coordsMix[i]);
    }
  }
  return boundaryMix;
};

export default useSetBoundary;

// 4개 미만일 때 문제 발생

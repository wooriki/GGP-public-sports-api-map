import { useEffect, useState } from 'react';
import useFetchPublicData from '../useFetchPublicData';
import { useNavermaps } from 'react-naver-maps';

const useGetCoords = (from, to) => {
  const navermaps = useNavermaps();
  const [location, setLocation] = useState([]);

  const { data } = useFetchPublicData(from, to);

  useEffect(() => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        setLocation((prev) => {
          return [...prev, { id: data[i].SVCID, name: data[i].SVCNM, Y: data[i].X, X: data[i].Y }];
        });
      }
    }
  }, [data, navermaps.LatLng]);

  return location;
};

export default useGetCoords;

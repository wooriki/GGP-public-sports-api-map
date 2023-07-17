import React, { useEffect } from 'react';
import axios from 'axios';

import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { styled } from 'styled-components';

const Maps = () => {
  const navermaps = useNavermaps();
  return (
    <StyledDiv className="home-temp-div second">
      <MapDiv
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <NaverMap defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)} defaultZoom={15}>
          <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
        </NaverMap>
      </MapDiv>
    </StyledDiv>
  );
};

export default Maps;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

// useEffect(() => {
//   const getData = async () => {
//     const res = await axios(
//       'http://openapi.seoul.go.kr:8088/456a6e50736b696d353555714c744b/json/ListPublicReservationSport/1/1000/'
//     );
//     console.log(res);
//   };
//   getData();
// }, []);

import React from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

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

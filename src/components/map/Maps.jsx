import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

const Maps = () => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);

  return (
    <StyledDiv className="home-temp-div second">
      <MapDiv style={mapStyle}>
        <NaverMap defaultCenter={new navermaps.LatLng(37.5667, 126.9784)} defaultZoom={15} ref={setMap}></NaverMap>
      </MapDiv>
    </StyledDiv>
  );
};

export default Maps;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  #test-button-div {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`;

const mapStyle = {
  width: '100%',
  height: '100%'
};

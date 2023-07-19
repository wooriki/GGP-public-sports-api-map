import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';

const Maps = ({ coords }) => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const { latitude, longitude } = useSelector((state) => state.location);

  return (
    <>
      <StyledDiv>
        <MapDiv style={mapStyle}>
          <NaverMap
            defaultCenter={new navermaps.LatLng(latitude, longitude)}
            defaultZoom={14}
            ref={setMap}
            disableKineticPan={false}
          >
            {/* <Marker position={new navermaps.LatLng(latitude, longitude)} /> */}
          </NaverMap>
        </MapDiv>
      </StyledDiv>
    </>
  );
};

export default Maps;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 700px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 0 #aaa;

  #test,
  .marker-test {
    color: white;
    text-shadow: 1px 1px 1px #777;
    display: flex;
    flex-direction: column;
    position: absolute;
    font-size: 1rem;
  }
`;

const mapStyle = {
  width: '100%',
  height: '100%'
};

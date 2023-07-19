import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

const Maps = ({ coords }) => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);

  return (
    <>
      <StyledDiv>
        <MapDiv style={mapStyle}>
          <NaverMap defaultCenter={new navermaps.LatLng(37.5667, 126.9784)} defaultZoom={8} ref={setMap}>
            <Marker position={new navermaps.LatLng(37.5667, 126.9784)} />
            {coords.map((location) => {
              return <Marker key={location.id} position={new navermaps.LatLng(+location.X, +location.Y)} />;
            })}
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

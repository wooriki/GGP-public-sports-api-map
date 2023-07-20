import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import MarkPins from './MarkPins';
import useSetBoundary from '../../hooks/mapHooks/setBoundaries';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Maps = () => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const { latitude, longitude } = useSelector((state) => state.location);

  //===================================//
  // pins => 좌표를 찍을 핀 모음
  // boundary => 핀 전체를 고르게 보여주기 위한 border 설정
  const pins = useSelector((state) => state['10 Location'].data);
  const boundary = useSetBoundary(pins);
  // 이후 MarkPins에 props로 map과 boundary를 보내면
  // pin이 생성되면서 전체적으로 고르게 보여준다.
  //-----------------------------------//

  //===================================//
  // 맵 우상단에 있는 아이콘 클릭 시 사용자 위치로 이동하는 함수
  const currentLocationIconClickHandler = () => {
    // 위치가 기본 위치이면 즉, 사용자가 위치 정보를 공유하지 않으면 => 작동하지 않게 설정
    if (latitude === 37.551086 && longitude === 126.988033) {
      return;
    } else {
      const coords = new navermaps.LatLng(latitude, longitude);
      if (map) {
        map.panTo(coords);
        map.setZoom(14, true);
      }
    }
  };
  //-----------------------------------//
  return (
    <>
      <StyledDiv>
        <MapDiv style={mapStyle}>
          <NaverMap
            defaultCenter={new navermaps.LatLng(latitude, longitude)}
            defaultZoom={9}
            minZoom={6}
            maxZoom={15}
            ref={setMap}
            disableKineticPan={false}
          >
            <MarkPins map={map} boundary={boundary} />
            <MyLocationIcon onClick={() => currentLocationIconClickHandler()} id="map-current-location" />
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
  #map-current-location {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    color: #555;
    background-color: #fff;
    padding: 5px;
    font-size: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px #aaa;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.2s;
  }
  #map-current-location:hover {
    color: #222;
    background-color: #dadada;
  }
`;

const mapStyle = {
  width: '100%',
  height: '100%'
};

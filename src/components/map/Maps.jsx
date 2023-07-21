import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import MarkPins from './MarkPins';
import useSetBoundary from '../../hooks/mapHooks/setBoundaries';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Maps = () => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const { latitude, longitude } = useSelector((state) => state.location);
  const [isItLoading, setIsItLoading] = useState(true);

  useEffect(() => {
    if (latitude === 37.551086 && longitude === 126.988033) {
      setIsItLoading(true);
      // 임시 방편 => 사용자가 위치 공유를 하지 않았을 때 어떤걸로 로딩을 감지할지 알아내야함.
      setTimeout(() => {
        setIsItLoading(false);
      }, 5000);
    } else {
      setIsItLoading(false);
    }
  }, [latitude, longitude]);

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
      {isItLoading ? (
        <StyledLoadingDiv>
          <div id="loading"></div>
          <h1>Map is loading</h1>
        </StyledLoadingDiv>
      ) : (
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
      )}
    </>
  );
};

export default Maps;

const StyledDiv = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 400px;
  height: 100%;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 0 rgba(39, 39, 39, 0.6);

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
    z-index: 1;
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

const StyledLoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 750px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 0 rgba(39, 39, 39, 0.6);

  #loading {
    border: 6px solid rgba(0, 0, 0, 0.3); /* 스피너 테두리 스타일 */
    border-top: 6px solid #284a58; /* 스피너 상단 테두리 스타일 (로딩 효과 색상) */
    border-radius: 50%; /* 원형 스피너 모양을 위해 반지름 설정 */
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite; /* @keyframes 이름, 시간, 타이밍 함수, 무한 반복 설정 */
  }
  /* @keyframes 정의로 로딩 스피너 애니메이션 설정 */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    } /* 360도 회전 */
  }
  h1 {
    font-size: 1.2rem;
  }
`;

const mapStyle = {
  width: '100%',
  height: '100%'
};

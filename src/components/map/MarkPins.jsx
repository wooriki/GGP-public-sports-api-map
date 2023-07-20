import React, { useEffect, useState } from 'react';
import { Marker, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import useSaveBoundary from '../../hooks/mapHooks/saveBoundary';
import { styled } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

// 특정 좌표가 주어 졌을 때, 그 좌표들에 핀을 놓고,
// 좌표들이 모두 표시될 수 있는 위치에 맵을 보인다.

const MarkPins = ({ map, boundary }) => {
  const navermaps = useNavermaps();
  const fetchedgroup = useSelector((state) => state['10 Location'].data);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [locationDetail, setLocationDetail] = useState({});

  // useSaveBoundary의 인자는 앞으로 가져올 데이터의 좌표들
  useSaveBoundary(fetchedgroup);
  //----------------------------------//
  useEffect(() => {
    if (map && boundary) {
      map.panToBounds(boundary);
    }
  }, [map, boundary]);
  // 핀 클릭시 이벤트
  const markerClickHandler = (location) => {
    setInfoWindowOpen(!infoWindowOpen);
    setLocationDetail((prev) => {
      const info = {
        name: location.name,
        reservStatus: location.reservStatus,
        reservURL: location.reservURL,
        img: location.img
      };
      return info;
    });
  };
  // 핀 클릭시 나타나는 상세 페이지
  const Something = () => {
    console.log(locationDetail, 333);
    return (
      <StyledDiv>
        <CloseIcon
          id="map-info-modal-close-icon"
          onClick={() => {
            setInfoWindowOpen(!infoWindowOpen);
          }}
        />
        <img src={locationDetail.img} alt="체육시설 사진" />
        <h1>{locationDetail.name}</h1>
        <h2
          onClick={() => {
            window.open(locationDetail.reservURL, '_blank');
          }}
        >
          {locationDetail.reservStatus}
        </h2>
        <button
          onClick={() => {
            window.open(locationDetail.reservURL, '_blank');
          }}
        >
          예약하기
        </button>
      </StyledDiv>
    );
  };
  //
  return (
    <>
      {infoWindowOpen && <Something />}
      {fetchedgroup?.map((location) => {
        return (
          <div key={location.id}>
            {/* <Marker key={location.id} position={new navermaps.LatLng(+location.latitude, +location.longitude)} /> */}
            <Marker
              key={location.id}
              position={new navermaps.LatLng(+location.latitude, +location.longitude)}
              onClick={() => markerClickHandler(location)}
            />
          </div>
        );
      })}
    </>
  );
};

export default MarkPins;

const StyledDiv = styled.div`
  width: 300px;
  height: 220px;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  top: 50%;
  gap: 11px;
  left: 50%;
  border-radius: 15px;
  background-color: rgba(220, 220, 225, 0.9);
  transform: translate(-50%, -50%);
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;

  img {
    width: 90%;
    height: 130px;
    border-radius: 8px;
    margin-top: 10px;
  }
  h1 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #444;
  }
  h2 {
    position: absolute;
    top: 3px;
    display: inline-flex;
    background-color: #202124;
    border: 1px solid #777;
    color: #fff;
    padding: 7px;
    border-radius: 15px;
    font-size: 12px;
    cursor: pointer;
  }
  button {
    background-color: #202853;
    color: white;
    padding: 5px 30px;
    border: none;
    box-shadow: 0 0 4px 0 #999;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
  }

  button:hover {
    background-color: #2a346d;
    color: #fff;
    transform: scale(1.05);
  }
  button:active {
    transform: scale(0.95);
  }
  #map-info-modal-close-icon {
    position: absolute;
    top: 3px;
    right: 5px;
    font-size: 1.75rem;
    color: #333;
    opacity: 0.75;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
  }
  #map-info-modal-close-icon:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

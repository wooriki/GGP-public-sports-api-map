import React, { useEffect, useRef, useState } from 'react';
import { Marker, useNavermaps } from 'react-naver-maps';
import { useDispatch, useSelector } from 'react-redux';
import useSaveBoundary from '../../hooks/mapHooks/saveBoundary';
import { styled } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { sendFacility } from '../../redux/modules/chosenFacility';
import { toggleIsFacilityChosen } from '../../redux/modules/maps/isFacilityChosen';

// 특정 좌표가 주어 졌을 때, 그 좌표들에 핀을 놓고,
// 좌표들이 모두 표시될 수 있는 위치에 맵을 보인다.

const MarkPins = ({ map, boundary }) => {
  const navermaps = useNavermaps();
  const fetchedgroup = useSelector((state) => state['10 Location'].data);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [locationDetail, setLocationDetail] = useState({});
  const isFacilityChosen = useSelector((state) => state.isFacilityChosen);
  const chosenFacility = useSelector((state) => state.chosenFacility);
  const dispatch = useDispatch();
  // useSaveBoundary의 인자는 앞으로 가져올 데이터의 좌표들

  useSaveBoundary(fetchedgroup);
  //----------------------------------//
  useEffect(() => {
    if (isFacilityChosen) {
      const chosenFacilityLocation = new navermaps.LatLng(chosenFacility.Y, chosenFacility.X);
      if (map) {
        map.panTo(chosenFacilityLocation);
        // map.setZoom(20, true);
      }
    }
    if (map && boundary) {
      map.panToBounds(boundary);
      setInfoWindowOpen(false); // 움직일 때 (페이지 변경할 때 모달창 열려있으면 닫기)
    }
  }, [map, boundary, isFacilityChosen, chosenFacility, navermaps.LatLng]);

  // =================================== //
  // 핀 클릭시 이벤트
  const markerClickHandler = async (location) => {
    if (!isFacilityChosen) {
      dispatch(sendFacility(location));
      dispatch(toggleIsFacilityChosen(true));
    }
    const coords = `${location.longitude},${location.latitude}`;
    const res = (
      await axios('http://localhost:3001', {
        params: {
          coords
        }
      })
    ).data.results;
    // e.g. addressInKorean => 서울특별시 영등포구 여의도동
    const addressInKorean = `${res[0].region.area1.name} ${res[0].region.area2.name} ${res[0].region.area3.name}`;
    //
    setInfoWindowOpen(!infoWindowOpen);
    setLocationDetail((prev) => {
      const info = {
        name: location.name,
        reservStatus: location.reservStatus,
        SVCURL: location.SVCURL,
        IMGURL: location.IMGURL,
        address: addressInKorean,
        SVCNM: location.SVCNM,
        RCPTBGNDT: location.RCPTBGNDT,
        RCPTENDDT: location.RCPTENDDT,
        TELNO: location.TELNO,
        V_MIN: location.V_MIN,
        V_MAX: location.V_MAX
      };
      return info;
    });
  };
  // --------------------------------------- //
  // 핀 클릭시 나타나는 상세 페이지
  const MapInfoModal = () => {
    const filteredName = locationDetail.name.split('>')[0];
    const backgroundColor =
      locationDetail.reservStatus === '접수중'
        ? { backgroundColor: '#223060' }
        : locationDetail.reservStatus === '안내중'
        ? { backgroundColor: '#22562d' }
        : locationDetail.reservStatus === '예약마감'
        ? { backgroundColor: '#d70011', color: '#fff' }
        : locationDetail.reservStatus === '예약일시중지'
        ? { backgroundColor: '#111', color: '#fff' }
        : locationDetail.reservStatus === '접수종료'
        ? { backgroundColor: '#111', color: '#fff' }
        : null;

    return (
      <StyledDiv>
        <CloseIcon
          id="map-info-modal-close-icon"
          onClick={() => {
            setInfoWindowOpen(!infoWindowOpen);
          }}
        />
        <img src={locationDetail.IMGURL} alt="체육시설 사진" />
        <h1>{filteredName}</h1>
        <p>{locationDetail.address}</p>
        <h2
          onClick={() => {
            window.open(locationDetail.reservURL, '_blank');
          }}
          style={backgroundColor}
        >
          {locationDetail.reservStatus}
        </h2>
        <button
          onClick={() => {
            window.open(locationDetail.reservURL, '_blank');
          }}
          style={backgroundColor}
        >
          {locationDetail.reservStatus === '접수중'
            ? '예약하기'
            : locationDetail.reservStatus === '안내중'
            ? '예약하기'
            : locationDetail.reservStatus === '예약마감'
            ? '예약마감'
            : locationDetail.reservStatus === '예약일시중지'
            ? '예약 불가'
            : locationDetail.reservStatus === '접수종료'
            ? '예약 불가'
            : null}
        </button>
      </StyledDiv>
    );
  };
  //

  return (
    <>
      {infoWindowOpen && <MapInfoModal />}
      {fetchedgroup?.map((location) => {
        return (
          <div key={location.SVCID}>
            <Marker
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
  height: 250px;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  top: 50%;
  gap: 13px;
  left: 50%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -50%);
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;

  img {
    width: 90%;
    height: 130px;
    border-radius: 8px;
    margin-top: 10px;
  }
  h1 {
    font-size: 1rem;
    font-weight: 700;
    color: #444;
  }
  p {
    color: #333;
    font-weight: 600;
    font-size: 0.75rem;
  }
  h2 {
    position: absolute;
    top: 3px;
    display: inline-flex;
    background-color: #202124;
    color: #fff;
    padding: 8px;
    border-radius: 15px;
    font-size: 12px;
    cursor: pointer;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  button {
    background-color: #202853;
    color: white;
    padding: 5px 50px;
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
    font-size: 2rem;
    font-weight: 700;
    padding: 2px;
    background-color: #ffffff88;
    border-radius: 10px;
    color: #333;
    opacity: 0.9;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
  }
  #map-info-modal-close-icon:hover {
    opacity: 1;
    transform: scale(1.05);
    background-color: #ffffff;
  }
`;

import React, { useState } from 'react';
import { styled } from 'styled-components';
import Comments from './Comments';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import zIndex from '@mui/material/styles/zIndex';
import { toggleIsFacilityChosen } from '../../redux/modules/maps/isFacilityChosen';
import { useDispatch } from 'react-redux';

const PostData = ({ setFacility, facility }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({ x: 0, y: 0 });
  //

  //
  const dispatch = useDispatch();
  const handleMouseEnter = (e) => {
    setMessagePosition({ x: e.clientX, y: e.clientY });
    setShowMessage(true);
  };
  const handleMouseLeave = () => {
    setShowMessage(false);
  };
  const handleMouseMove = (e) => {
    setMessagePosition({ x: e.clientX, y: e.clientY });
  };
  const tooltipStyled = {
    position: 'fixed',
    top: messagePosition.y,
    left: messagePosition.x + 15, // 요소의 오른쪽에 띄우기 위해 x 위치에 20px 추가
    padding: '8px',
    background: '#444',
    borderRadius: '4px',
    display: showMessage ? 'block' : 'none',
    zIndex: 2,
    opacity: '0.8'
  };

  const openLink = () => {
    window.open(facility.SVCURL, '');
  };

  const getShortenedDate = (dateStr) => {
    // dateStr은 날짜 형식의 문자열로 가정합니다. 예: '2023-07-24'
    const shortenedDate = dateStr.substring(0, 10);
    return shortenedDate;
  };

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <PostBOX>
      <ArrowBackIosNewIcon
        id="detail-go-back"
        onClick={() => {
          setFacility(null);
          dispatch(toggleIsFacilityChosen(false));
        }}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        onMouseMove={handleMouseMove}
      />
      {showMessage && (
        <div style={tooltipStyled}>
          <p>뒤로가기</p>
        </div>
      )}

      <div id="detail-image-container">
        <img src={facility.IMGURL} alt="facility img" />
        <div id="facility-title">{facility.MAXCLASSNM}</div>
      </div>
      <div id="detail-title-container">
        <h1>{facility.PLACENM}</h1>
        <div id="detail-status-info">
          <div>
            <p>{facility.PAYATNM}</p>
          </div>
          <div>
            <p>{facility.SVCSTATNM}</p>
          </div>
        </div>
      </div>
      <div id="detail-divider"></div>
      <div id="detail-title">
        <div>[ {facility.SVCNM} ]</div>
        <span>
          접수기간:&nbsp;&nbsp;{getShortenedDate(facility.RCPTBGNDT)} ~ {getShortenedDate(facility.RCPTENDDT)}
        </span>
        <button id="detail-book" onClick={openLink}>
          예약하기
        </button>
      </div>
      <div id="detail-divider-2"></div>
      <div>
        <div>{facility.TELNO ? `연락처: ${facility.TELNO}` : `연락처: 상세페이지를 참고하세요.`}</div>
      </div>
      <div>
        이용시간:&nbsp;&nbsp;{facility.V_MIN} ~ {facility.V_MAX}
      </div>
      <Comments facility={facility} />
    </PostBOX>
  );
};

export default PostData;

const PostBOX = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: auto;

  #detail-go-back {
    position: sticky;
    top: 5px;
    left: 5px;
    background-color: #18191bdc;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    transform: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }

  #detail-image-container {
    position: relative;
  }
  #detail-divider {
    width: 30%;
    height: 2px;
    border: 2px white solid;
  }
  #detail-divider-2 {
    width: 100%;
    height: 1px;
    border: 0.5px white solid;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
  #facility-title {
    position: absolute;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 10px;
    color: #333;
    font-weight: 700;
    top: 0;
    left: 0;
  }
  #detail-title-container {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 1.5rem;
      color: #eee;
      font-weight: 600;
      padding-right: 2rem;
    }
  }
  #detail-status-info {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    div {
      padding: 3px 6px;
      background-color: #fafafa;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-top: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div > * {
      color: #333;
    }
  }

  #detail-title {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #detail-detail {
    margin: 0 auto;
    line-height: 1.3;
    width: 90%;
    color: #ddd;
    font-size: 0.9rem;
    text-align: justify;
  }

  #detail-book {
    padding: 7px 20px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    border-radius: 8px;
    border: none;
    background-color: #233c50;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #2b4a63;
    }
  }
`;

import React from 'react';
import { Link } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';

const PostData = ({ setFacility, facility }) => {
  const openLink = () => {
    window.open(facility.SVCURL, '');
  };

  if (!facility) {
    return <div>Loading...</div>;
  }
  return (
    <PostBOX>
      <button
        id="detail-go-back"
        onClick={() => {
          setFacility(null);
        }}
      >
        뒤로가기
      </button>
      <div id="detail-image-container">
        <img src={facility.IMGURL} alt="facility img" />
        <div id="facility-title">{facility.MAXCLASSNM}</div>
      </div>
      <div id="detail-title-container">
        <h1>{facility.MINCLASSNM}</h1>
        <div id="detail-status-info">
          <p>{facility.PAYATNM}</p>
          <p>{facility.SVCSTATNM}</p>
        </div>
      </div>
      <div id="detail-divider"></div>
      <div id="detail-title">
        <div>장소명: {facility.PLACENM}</div>
        <div>소재구: {facility.AREANM}</div>
        <button id="detail-book" onClick={openLink}>
          예약하기
        </button>
      </div>
      <div id="detail-divider-2"></div>
      <div>
        <div>{facility.TELNO ? `연락처: ${facility.TELNO}` : `연락처: "없음"`}</div>
      </div>
      <h5>상세설명:</h5>
      <p id="detail-detail">{facility.DTLCONT}</p>
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
    }
    p {
      padding: 3px 6px;
      background-color: #fafafa;
      color: #333;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-top: 2px;
    }
  }
  #detail-status-info {
    display: flex;
    gap: 5px;
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
  #detail-go-back {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

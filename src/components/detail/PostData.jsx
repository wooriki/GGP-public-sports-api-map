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
      <div>
        <Img src={facility.IMGURL} />
        <ContentHover>{facility.DTLCONT}</ContentHover>
      </div>
      <ConDiv>
        <div>{facility.MAXCLASSNM}</div>&nbsp;&nbsp;
        <div>{facility.MINCLASSNM}</div>
      </ConDiv>
      <ConDiv>
        <div>{facility.PLACENM}</div>&nbsp;&nbsp;
        <div>{facility.AREANM}</div>
      </ConDiv>
      <ConDiv>
        <div>{facility.SVCOPNBGNDT}</div>&nbsp;&nbsp;
        <div>{facility.SVCOPNENDDT}</div>
      </ConDiv>
      <ConDiv>
        <div>{facility.RCPTBGNDT}</div>&nbsp;&nbsp;
        <div>{facility.RCPTENDDT}</div>
      </ConDiv>
      <ConDiv>
        <div>{facility.SVCSTATNM}</div>&nbsp;&nbsp;
        <div>{facility.PAYATNM}</div>
        <div>{facility.TELNO ? `연락처: ${facility.TELNO}` : `연락처: "없음"`}</div>
      </ConDiv>
      <div>
        <Btn onClick={openLink}>예약하러가기</Btn>
        <Btn
          onClick={() => {
            setFacility(null);
          }}
        >
          뒤로가기
        </Btn>
      </div>
    </PostBOX>
  );
};

export default PostData;

const Img = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 14px;
`;
const ContentHover = styled.div`
  padding: 12px 10px;
  background-color: rgba(138, 138, 138, 0.788);
  border-radius: 10px;
  margin: 10px;

  width: 400px;
  height: 80px;
  overflow: hidden;
  line-height: 20px;

  overflow: hidden;
`;

const PostBOX = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
`;

const ConDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: rgba(138, 138, 138, 0.788);
  border-radius: 10px;
  margin: 10px;
`;
const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.025);
  }
  100% {
    transform: scale(1);
  }

`;
const Btn = styled.button`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(68, 68, 68, 0.671);
  border: none;
  color: rgba(212, 212, 212, 0.771);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(138, 138, 138, 0.788);
  }
`;

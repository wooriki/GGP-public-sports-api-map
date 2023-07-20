import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const PostData = ({ location, facility }) => {
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
      </ConDiv>
      <div>
        <button onClick={openLink}>예약하러가기</button>
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
  border: 1px solid black;
  margin: 10px;

  width: 400px;
  height: 60px;
  overflow: hidden;
  line-height: 20px;
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
  border: 1px solid black;
  margin: 10px;
  padding: 4px 8px;
`;
// const Content = styled.div`
//   border: 1px solid black;
//   margin: 10px;

//   width: 140px;
//   height: 20px;
//   overflow: hidden;
//   line-height: 20px;
//   color: white;
// `;
// const ContentCont = styled.div`
//   border: 1px solid black;
//   margin: 10px;

//   width: 400px;
//   height: 60px;
//   overflow: hidden;
//   line-height: 20px;
//   color: white;
// `;

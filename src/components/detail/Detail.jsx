import React from 'react';
import Comments from '../detail/Comments';
import PostData from '../detail/PostData';
import { styled } from 'styled-components';

const Detail = ({ setFacility, facility }) => {
  return (
    <PostContainer>
      <PostWrapper>
        <PostData setFacility={setFacility} facility={facility} />
        <Comments facility={facility} />
      </PostWrapper>
    </PostContainer>
  );
};

export default Detail;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  color: rgba(236, 236, 236, 0.89);
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 0 30px 30px 0;
  padding-bottom: 10px;
  margin-left: 4px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

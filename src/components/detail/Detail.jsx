import React from 'react';
import PostData from '../detail/PostData';
import { styled } from 'styled-components';

const Detail = ({ setFacility, facility }) => {
  return (
    <PostWrapper>
      <PostData setFacility={setFacility} facility={facility} />
    </PostWrapper>
  );
};

export default Detail;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #eee;
  background-color: #18191bee;
  padding: 1rem;
  height: 100%;
`;

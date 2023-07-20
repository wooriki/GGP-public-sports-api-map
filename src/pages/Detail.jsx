import React from 'react';
import Comments from '../components/comments/Comments';
import PostData from '../components/postData/PostData';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const Detail = () => {
  const location = useLocation();
  const facility = location.state?.facility || null;

  return (
    <PostContainer>
      <PostWrapper>
        <PostData location={location} facility={facility} />
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
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

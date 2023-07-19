import React from 'react';
import { useQuery } from 'react-query';
import { getReviews } from '../../axios/review';

export const Review = () => {
  const { isLoading, isError, data } = useQuery('reviews', getReviews);
  console.log(data);

  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <div>
      <p>댓글</p>
      <div>
        {data.map((review) => {
          return (
            <div>
              <div>writer : {review.writer}</div>
              <div>contents : {review.contents}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

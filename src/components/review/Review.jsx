import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { getReviews, createReview, removeReview, updateReview } from '../../axios/review';
import { setReviews } from '../../redux/modules/reviewSlice';
import { styled } from 'styled-components';

export const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  // 댓글 목록 조회하는 쿼리
  const { isLoading, isError } = useQuery('reviews', getReviews, {
    // 성공적으로 데이터를 가져왔을 때 Redux 상태 업데이트
    onSuccess: (data) => {
      dispatch(setReviews(data));
    }
  });
  const [writer, setWriter] = useState();
  const [contents, setContents] = useState();

  const queryClient = useQueryClient();

  // 댓글 추가
  const createReviewMutation = useMutation(createReview, {
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries('reviews');
    }
  });

  // 댓글 삭제
  const removeReviewMutation = useMutation(removeReview, {
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries('reviews');
    }
  });

  // 댓글 수정
  const updateReviewMutation = useMutation(updateReview, {
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries('reviews');
    }
  });

  // 댓글 추가 핸들러
  const reviewCreateHandler = async (e) => {
    e.preventDefault();
    if (!writer || !contents) {
      alert('필수 값이 누락되었습니다. 확인해주세요!');
      return false;
    }

    const newReview = {
      id: shortid.generate(),
      // postId: id,
      writer,
      contents
    };

    const confirmCreate = window.confirm('작성하시겠습니까?');
    if (!confirmCreate) {
      return;
    }

    try {
      await createReviewMutation.mutateAsync(newReview);
      // 댓글 추가 액션 디스패치
      dispatch({ type: 'reviews/createReview', payload: newReview });
    } catch (error) {
      console.error(error);
    }

    // 입력 필드 초기화
    setWriter('');
    setContents('');
  };

  const writerChangeHandler = (e) => {
    setWriter(e.target.value);
  };

  const contentsChangeHanlder = (e) => {
    setContents(e.target.value);
  };

  // 댓글 삭제 핸들러
  const removeReviewHandler = async (review) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await removeReviewMutation.mutateAsync(review);
        // 댓글 삭제 액션 디스패치
        dispatch({ type: 'reviews/removeReview', payload: review });
        offEditMode();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [editedReviewId, setEditedReviewId] = useState(null);
  const [editedWriter, setEditedWriter] = useState('');
  const [editedContents, setEditedContents] = useState('');

  // 댓글 수정 핸들러
  const updateReviewHandler = async (review) => {
    try {
      const editedReview = {
        ...review,
        writer: editedWriter,
        contents: editedContents
      };
      const confirmSave = window.confirm('저장하시겠습니까?');
      if (confirmSave) {
        await updateReviewMutation.mutateAsync(editedReview);
        // 댓글 수정 액션 디스패치
        dispatch({ type: 'reviews/updateReview', payload: editedReview });
      }
      offEditMode();
    } catch (error) {
      console.error(error);
    }
  };
  const editContentsChangeHanlder = (e) => {
    setEditedContents(e.target.value);
  };
  // 수정 모드 on
  const onEditMode = (review) => {
    setEditedReviewId(review.id);
    setEditedWriter(review.writer);
    setEditedContents(review.contents);
  };

  // 수정 모드 off
  const offEditMode = () => {
    setEditedReviewId(null);
    setEditedWriter('');
    setEditedContents('');
  };

  // 로딩 중일 때
  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  // 에러 발생 시
  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <ReviewContainer>
      <ReviewWrapper>
        <p>댓글</p>
        <form onSubmit={reviewCreateHandler}>
          <input type="text" name="writer" value={writer} onChange={writerChangeHandler} placeholder="작성자" />
          <input type="text" name="contents" value={contents} onChange={contentsChangeHanlder} placeholder="내용" />
          <button>작성</button>
        </form>
        <div>
          {reviews.map((review) => {
            const isEditMode = editedReviewId === review.id;
            return (
              <ReviewBox key={review.id}>
                <div>writer : {review.writer}</div>
                <div>
                  {isEditMode ? (
                    <>
                      <textarea value={editedContents} onChange={editContentsChangeHanlder} />
                    </>
                  ) : (
                    <>contents : {review.contents}</>
                  )}
                </div>

                <div>
                  {isEditMode ? (
                    <>
                      <button onClick={() => updateReviewHandler(review)}>저장</button>
                      <button onClick={offEditMode}>취소</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => onEditMode(review)}>수정</button>
                      <button onClick={() => removeReviewHandler(review)}>삭제</button>
                    </>
                  )}
                </div>
              </ReviewBox>
            );
          })}
        </div>
      </ReviewWrapper>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  padding: 10px;
  margin: 10px;
  width: 500px;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const ReviewBox = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  width: 300px;
`;

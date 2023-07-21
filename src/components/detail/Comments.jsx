import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { getReviews, createReview, removeReview, updateReview } from '../../axios/review';
import { setReviews } from '../../redux/modules/reviewSlice';
import { styled, keyframes } from 'styled-components';

const Comments = ({ facility }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  // 댓글 목록 조회하는 쿼리
  const { isLoading, isError } = useQuery('reviews', getReviews, {
    // 성공적으로 데이터를 가져왔을 때 Redux 상태 업데이트!
    onSuccess: (data) => {
      dispatch(setReviews(data));
    }
  });
  const [writer, setWriter] = useState();
  const [contents, setContents] = useState();

  const queryClient = useQueryClient();

  // 댓글 추가
  const createReviewMutation = useMutation((newReview) => createReview(newReview), {
    onSuccess: (data) => {
      // 서버에서 생성된 댓글과 ID를 리덕스 스토어에 저장
      dispatch({ type: 'reviews/createReview', payload: data });
      // 새로운 댓글을 리액트 쿼리 캐시에 추가
      queryClient.setQueryData('reviews', (prev) => [...prev, data]);
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
      postId: facility.SVCID,
      writer,
      contents
    };

    const confirmCreate = window.confirm('작성하시겠습니까?');
    if (!confirmCreate) {
      return;
    }

    try {
      await createReviewMutation.mutate(newReview);
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
        await removeReviewMutation.mutate(review);
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
        await updateReviewMutation.mutate(editedReview);
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

  if (!facility) {
    return <div>Facility 정보를 불러오는 중...</div>; // 또는 다른 메시지를 표시할 수 있습니다.
  }

  // 로딩 중일 때!
  if (isLoading) {
    return <h3>Loading...!</h3>;
  }

  // 에러 발생 시!
  if (isError) {
    return <h3>Error...!</h3>;
  }

  return (
    <ReviewContainer>
      <ReviewWrapper>
        <p>댓글을 작성해 주세요</p>
        <FormTag onSubmit={reviewCreateHandler}>
          <InputTagF type="text" name="writer" value={writer} onChange={writerChangeHandler} placeholder="작성자" />
          <InputTag type="text" name="contents" value={contents} onChange={contentsChangeHanlder} placeholder="내용" />
          <Btn>작성</Btn>
        </FormTag>
        <div>
          {reviews
            .filter((review) => review.postId == facility.SVCID)
            .map((review) => {
              const isEditMode = editedReviewId === review.id;
              return (
                <ReviewBox key={review.id}>
                  <Writer>작성자 : {review.writer}</Writer>
                  <div>
                    {isEditMode ? (
                      <>
                        <textarea value={editedContents} onChange={editContentsChangeHanlder} />
                      </>
                    ) : (
                      <>댓글 : {review.contents}</>
                    )}
                    {/* 수정 삭제버튼 */}
                    <Btns>
                      {isEditMode ? (
                        <>
                          <BtnToggle onClick={() => updateReviewHandler(review)}>저장</BtnToggle>
                          <BtnToggle onClick={offEditMode}>취소</BtnToggle>
                        </>
                      ) : (
                        <>
                          <BtnToggle onClick={() => onEditMode(review)}>수정</BtnToggle>
                          <BtnToggle onClick={() => removeReviewHandler(review)}>삭제</BtnToggle>
                        </>
                      )}
                    </Btns>
                  </div>
                </ReviewBox>
              );
            })}
        </div>
      </ReviewWrapper>
    </ReviewContainer>
  );
};

export default Comments;

const ReviewContainer = styled.div`
  padding: 10px;
  margin: 10px;
  width: 500px;
`;
const FormTag = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const InputTagF = styled.input`
  padding: 10px;
  border-radius: 8px 0 0 8px;
`;
const InputTag = styled.input`
  padding: 10px;
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
  border-radius: 0 8px 8px 0;
  background-color: rgba(68, 68, 68, 0.671);
  border: none;
  color: rgba(212, 212, 212, 0.771);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(138, 138, 138, 0.788);
  }
`;
const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const ReviewBox = styled.div`
  border: 1px solid black;
  width: 100%;
  padding: 20px;
  margin: 10px;
  width: 300px;
`;
const Writer = styled.p`
  margin-bottom: 10px;
`;

const Btns = styled.button`
  float: right;
  display: flex;
  background-color: rgba(255, 255, 255, 0);
  border: none;
`;

const BtnToggle = styled.button`
  padding: 4px;
  border-radius: 6px;
  background-color: rgba(131, 131, 131, 0.671);
  border: none;
  color: rgba(212, 212, 212, 0.771);
  cursor: pointer;
`;

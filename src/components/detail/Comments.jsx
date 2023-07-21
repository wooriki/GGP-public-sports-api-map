import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, createComment, removeComment, updateComment } from '../../axios/comment';
import { setComments } from '../../redux/modules/commentsSlice';
import { styled } from 'styled-components';

const Comments = ({ facility }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [writer, setWriter] = useState();
  const [contents, setContents] = useState();
  const [password, setPassword] = useState();

  const queryClient = useQueryClient();

  // 댓글 목록 조회하는 쿼리
  const { isLoading, isError } = useQuery('comments', getComments, {
    // 성공적으로 데이터를 가져왔을 때 Redux 상태 업데이트!
    onSuccess: (data) => {
      dispatch(setComments(data));
    }
  });

  // 댓글 추가하는 뮤테이션
  const createCommentMutation = useMutation(createComment, {
    onSuccess: (data) => {
      // 서버에서 생성된 댓글과 ID를 리덕스 스토어에 저장
      dispatch({ type: 'comments/createComment', payload: data });
      // 새로운 댓글을 리액트 쿼리 캐시에 추가
      queryClient.setQueryData('comments', (prev) => [...prev, data]);
    }
  });

  // 댓글 삭제하는 뮤테이션
  const removeCommentMutation = useMutation(removeComment, {
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries('comments');
    }
  });

  // 댓글 수정하는 뮤테이션
  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries('comments');
    }
  });

  // 댓글 추가 핸들러
  const commentCreateHandler = (e) => {
    e.preventDefault();
    if (!writer || !contents) {
      alert('필수 값이 누락되었습니다. 확인해주세요!');
      return false;
    }

    const newComment = {
      postId: facility.SVCID,
      writer,
      contents,
      password
    };

    const confirmCreate = window.confirm('작성하시겠습니까?');
    if (!confirmCreate) {
      return;
    }

    try {
      createCommentMutation.mutate(newComment);
      // 댓글 추가 액션 디스패치
      dispatch({ type: 'comments/createComment', payload: newComment });
    } catch (error) {
      console.error(error);
    }

    // 입력 필드 초기화
    setWriter('');
    setContents('');
    setPassword('');
  };

  const writerChangeHandler = (e) => {
    setWriter(e.target.value);
  };

  const contentsChangeHanlder = (e) => {
    setContents(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  // 댓글 삭제 핸들러
  const removeCommentHandler = (comment) => {
    const userEnteredPassword = window.prompt('비밀번호를 입력하세요.'); // 사용자로부터 비밀번호 입력 받기
    if (userEnteredPassword !== comment.password) {
      alert('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 시 알림
      return;
    }

    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        removeCommentMutation.mutate(comment);
        // 댓글 삭제 액션 디스패치
        dispatch({ type: 'comments/removeComment', payload: comment });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedWriter, setEditedWriter] = useState('');
  const [editedContents, setEditedContents] = useState('');

  // 댓글 수정 핸들러
  const updateCommentHandler = (comment) => {
    try {
      const editedComment = {
        ...comment,
        writer: editedWriter,
        contents: editedContents
      };
      const confirmSave = window.confirm('저장하시겠습니까?');
      if (confirmSave) {
        updateCommentMutation.mutate(editedComment);
        // 댓글 수정 액션 디스패치
        dispatch({ type: 'comments/updateComment', payload: editedComment });
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
  const onEditMode = (comment) => {
    const userEnteredPassword = window.prompt('비밀번호를 입력하세요.'); // 사용자로부터 비밀번호 입력 받기
    if (userEnteredPassword !== comment.password) {
      alert('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 시 알림
      return;
    }

    setEditedCommentId(comment.id);
    setEditedWriter(comment.writer);
    setEditedContents(comment.contents);
  };

  // 수정 모드 off
  const offEditMode = () => {
    setEditedCommentId(null);
    setEditedWriter('');
    setEditedContents('');
  };

  if (!facility) {
    return <div>Facility 정보를 불러오는 중...</div>;
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
    <CommentContainer>
      <CommentWrapper>
        <p>댓글</p>
        <form onSubmit={commentCreateHandler}>
          <input type="text" name="writer" value={writer} onChange={writerChangeHandler} placeholder="작성자" />
          <input type="text" name="contents" value={contents} onChange={contentsChangeHanlder} placeholder="내용" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="비밀번호"
          />
          <button>작성</button>
        </form>
        <div>
          {comments
            .filter((comment) => comment.postId == facility.SVCID)
            .map((comment) => {
              const isEditMode = editedCommentId === comment.id;
              return (
                <CommentBox key={comment.id}>
                  <div>writer : {comment.writer}</div>
                  <div>
                    {isEditMode ? (
                      <>
                        <textarea value={editedContents} onChange={editContentsChangeHanlder} />
                      </>
                    ) : (
                      <>contents : {comment.contents}</>
                    )}
                  </div>

                  <div>
                    {isEditMode ? (
                      <>
                        <button onClick={() => updateCommentHandler(comment)}>저장</button>
                        <button onClick={offEditMode}>취소</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => onEditMode(comment)}>수정</button>
                        <button onClick={() => removeCommentHandler(comment)}>삭제</button>
                      </>
                    )}
                  </div>
                </CommentBox>
              );
            })}
        </div>
      </CommentWrapper>
    </CommentContainer>
  );
};

export default Comments;

const CommentContainer = styled.div`
  padding: 10px;
  margin: 10px;
  width: 500px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const CommentBox = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  width: 300px;
`;

import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, createComment, removeComment, updateComment } from '../../axios/comment';
import { setComments } from '../../redux/modules/commentsSlice';
import { styled, keyframes } from 'styled-components';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import axios from 'axios';

const Comments = ({ facility }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [writer, setWriter] = useState();
  const [contents, setContents] = useState();
  const [password, setPassword] = useState();
  const [toggleLeaveComment, setToggleLeaveComment] = useState(false);

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
  const commentCreateHandler = async (e) => {
    e.preventDefault();
    setToggleLeaveComment(!toggleLeaveComment);
    if (!writer || !contents) {
      alert('필수 값이 누락되었습니다. 확인해주세요!');
      return false;
    }
    //
    //  수정인: 김환훈
    // 기능: db.json에 저장되어있는 기본 아바타 사진 7개중에 랜덤으로 한 개 골라서 저장하기
    const randomNumber = Math.floor(Math.random() * 7);

    const randomProfilePhoto = (await axios('http://localhost:4000/profile-photos')).data[randomNumber];
    //
    //;
    const newComment = {
      postId: facility.SVCID,
      writer,
      contents,
      password,
      profilePhoto: randomProfilePhoto
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
      <h3>이용후기</h3>
      <DividerThick></DividerThick>
      <WriteCommentContainer>
        {!toggleLeaveComment ? (
          <ArrowRightIcon
            style={{ transform: 'rotate(0deg)' }}
            id="comment-write-comment-toggle"
            onClick={() => setToggleLeaveComment(!toggleLeaveComment)}
          />
        ) : (
          <ArrowRightIcon
            style={{ transform: 'rotate(90deg)' }}
            id="comment-write-comment-toggle"
            onClick={() => setToggleLeaveComment(!toggleLeaveComment)}
          />
        )}

        <h4>후기작성하기</h4>
      </WriteCommentContainer>
      {toggleLeaveComment && (
        <CommentInputForm onSubmit={commentCreateHandler}>
          <div id="input-first-line">
            <input
              type="text"
              name="writer"
              value={writer}
              onChange={writerChangeHandler}
              placeholder="작성자"
              autocomplete="username"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={passwordChangeHandler}
              placeholder="비밀번호"
              autocomplete="current-password"
            />
          </div>
          <input type="text" name="contents" value={contents} onChange={contentsChangeHanlder} placeholder="내용" />
          <div id="comment-button-container">
            <input
              type="button"
              value="취소"
              id="comment-cancel-button"
              onClick={() => setToggleLeaveComment(!toggleLeaveComment)}
            />
            <input type="submit" value="작성" id="comment-submit-button" />
          </div>
        </CommentInputForm>
      )}

      <CommentListContainer>
        {comments
          .filter((comment) => comment.postId === facility.SVCID)
          .map((comment) => {
            const isEditMode = editedCommentId === comment.id;
            return (
              <Comment key={comment.id}>
                <img
                  id="comment-profile-photo"
                  src={comment.profilePhoto || 'https://i.ibb.co/wK9wmGG/anonymous-avatar-icon-25.png'}
                  alt="profile-img"
                />
                <CommentContent>
                  <div>
                    <h6>{comment.writer}</h6>
                  </div>
                  <CommentContentBody>
                    {isEditMode ? (
                      <>
                        <textarea value={editedContents} onChange={editContentsChangeHanlder} />
                      </>
                    ) : (
                      <p>{comment.contents}</p>
                    )}
                  </CommentContentBody>
                </CommentContent>
                <CommentModityButtonContainer>
                  {isEditMode ? (
                    <>
                      <SaveAsOutlinedIcon
                        className="comment-modify-icons"
                        onClick={() => updateCommentHandler(comment)}
                      />
                      <CancelPresentationOutlinedIcon className="comment-modify-icons" onClick={offEditMode} />
                    </>
                  ) : (
                    <>
                      <EditOutlinedIcon className="comment-modify-icons" onClick={() => onEditMode(comment)} />
                      <DeleteOutlineOutlinedIcon
                        className="comment-modify-icons"
                        onClick={() => removeCommentHandler(comment)}
                      />
                    </>
                  )}
                </CommentModityButtonContainer>
              </Comment>
            );
          })}
      </CommentListContainer>
    </CommentContainer>
  );
};

export default Comments;

const WriteCommentContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  #comment-write-comment-toggle {
    font-size: 2rem;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #262626;
    }
  }
  h4 {
    font-size: 1.1rem;
    z-index: 2;
  }
`;
const CommentInputForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 5px;
  input {
    height: 40px;
    padding: 8px;
    border-radius: 6px;
    background-color: #191919;
    border: #414141 1.3px solid;
    color: #eee;
  }
  input:focus {
    outline: #1f91f9 1.3px solid;
  }

  #input-first-line {
    display: flex;
    gap: 5px;
    & > * {
      flex: 1 1 auto;
    }
  }
  #comment-button-container {
    display: flex;
    gap: 5px;
    & > * {
      font-size: 0.95rem;
      border: transparent;
      flex: 1 1 auto;
      cursor: pointer;
    }
    & > *:hover {
      opacity: 0.9;
    }
    #comment-cancel-button {
      color: #fff;
      background-color: #303030;
    }
    #comment-submit-button {
      color: #fff;
      background-color: #1f91f9;
    }
    #comment-submit-button:disabled {
      color: #fff;
      background-color: #fff;
    }
  }
`;
const CommentContainer = styled.div`
  h3 {
    margin: 1rem 0;
    font-weight: 700;
    font-size: 1.5rem;
  }

  #comment-input-container {
  }
`;

const Divider = styled.div`
  margin: 2rem auto 0 auto;
  width: 90%;
  height: 2px;
  border-bottom: 1px solid #fff;
`;
const DividerThick = styled.div`
  margin: 0.5rem 0;
  width: 30%;
  height: 2px;
  border-bottom: 4px solid #fff;
`;

const CommentListContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem 1rem;
  #comment-profile-photo {
    margin-top: 0.3rem;
    width: 32px;
    height: 32px;
    border-radius: 100px;
  }
`;

const CommentContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-evenly;
  h6 {
    font-weight: 600;
  }
`;
const CommentModityButtonContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin: 0.3rem 0;
  .comment-modify-icons {
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      background-color: #262626;
    }
  }
`;

const CommentContentBody = styled.div`
  display: flex;
  textarea {
    border-radius: 5px;
    background-color: #191919;
    color: #eee;
    font-size: 0.95;
    flex: 1 1 auto;
    resize: none;
    height: auto;
  }
  p {
    color: #ddd;
    font-size: 0.95rem;
  }
`;

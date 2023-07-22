import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

const YouTubeApi = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const ulRef = useRef(null);

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const getPlaylistLink = (playlistId) => {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  };

  const [playlist, setPlaylist] = useState([]);

  const shuffledPlaylist = shuffleArray(playlist);

  // 추가된 함수: YouTubeApi 함수 내부에 위치합니다.
  const handleScroll = () => {
    const ulRef = ulRef.current;
    if (ulRef) {
      const scrollPercentage = (ulRef.scrollTop / (ulRef.scrollHeight - ulRef.clientHeight)) * 100;
      const thumbPosition = scrollPercentage * (ulRef.clientHeight / 100);
      ulRef.style.setProperty('--thumb-position', `${thumbPosition}px`);
    }
  };

  useEffect(() => {
    axios
      .get(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCSGC87iX0QhnIfUOI_B_Rdg&maxResults=50&key=AIzaSyDG0fmpzvRTNpr4Aaj8DP_6ecKlnbbk4cg'
      )
      .then((res) => {
        setPlaylist(res.data.items);
        setIsMounted(true);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {isMounted && (
        <UlMother>
          <UlTag ref={ulRef}>
            {shuffledPlaylist.slice(0, 5).map((item) => (
              <LiTag key={item.id} onClick={() => handlePlaylistClick(item.id)}>
                <a href={getPlaylistLink(item.id)} target="_blank" rel="noopener noreferrer">
                  <ImgTag src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                  <SubTitle>{item.snippet.title}</SubTitle>
                </a>
              </LiTag>
            ))}
          </UlTag>
        </UlMother>
      )}
    </>
  );
};

const UlMother = styled.div``;

const UlTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: auto; /* 세로 스크롤을 허용합니다. */
  max-height: calc(100vh - 980px); /* 최대 높이를 뷰포트 높이 - 200px로 설정하여 유동적으로 스크롤이 생기도록 합니다. */
`;

const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LiTag = styled.li`
  width: 230px;
  height: 160px;
  cursor: pointer;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0);
`;

const ImgTag = styled.img`
  width: 100%;
  border: 1px black solid;
  border-radius: 10px;
  border: none;
  box-shadow: 10px 10px 20px rgba(39, 39, 39, 0.6);

  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;

const SubTitle = styled.h4`
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: 10px 0 20px;
  width: 250px;
  border-radius: 14px 0 0;
`;

export default YouTubeApi;

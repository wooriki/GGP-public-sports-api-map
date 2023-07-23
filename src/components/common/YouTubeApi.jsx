import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

const YouTubeApi = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);

  const ulRef = useRef(null);

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const getPlaylistLink = (playlistId) => {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCSGC87iX0QhnIfUOI_B_Rdg&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then((res) => {
        const playlist = res.data.items;
        const shuffledArray = shuffleArray(playlist);
        setShuffledPlaylist(shuffledArray);
        setIsMounted(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // 배열을 섞습니다.
    const shuffledArray = shuffleArray(playlist);

    // 랜덤으로 섞은 배열의 처음 5개를 선택합니다.
    const slicedArray = shuffledArray.slice(0, 5);

    // 선택된 배열을 state에 저장합니다.
    setShuffledPlaylist(slicedArray);
  }, [playlist]);

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

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
  overflow-x: hidden; /* 가로 방향 스크롤을 감춥니다. */
  overflow-y: auto; /* 세로 스크롤을 허용합니다. */
  // height: 190px;
  min-height: 200px;
  max-height: calc(
    185vh - 2417px
  ); /* 최대 높이를 뷰포트 높이 - 200px로 설정하여 유동적으로 스크롤이 생기도록 합니다. */

  /* 스크롤 바 스타일 */
  ::-webkit-scrollbar {
    width: 20x;
  }
  -webkit-scrollbar-thumb {
    background-color: #888; /* Chrome, Safari, Edge에 적용되는 스크롤 바 썸네일 색상을 설정합니다. */
    border-radius: 4px; /* Chrome, Safari, Edge에 적용되는 스크롤 바 썸네일의 모서리를 둥글게 설정합니다. */
  }
  -webkit-scrollbar-thumb:hover {
    background-color: #555; /* 스크롤 바 썸네일에 마우스 오버 효과를 설정합니다. */
  }
  -webkit-scrollbar-track {
    background-color: #ddd; /* Chrome, Safari, Edge에 적용되는 스크롤 바 트랙 색상을 설정합니다. */
  }
  -webkit-scrollbar-track:hover {
    background-color: #eee; /* 스크롤 바 트랙에 마우스 오버 효과를 설정합니다. */
  }
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
  text-transform: uppercase;
`;

export default YouTubeApi;

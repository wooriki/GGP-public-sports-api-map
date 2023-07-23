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
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 200px;
  max-height: calc(
    185vh - 2417px
  );
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

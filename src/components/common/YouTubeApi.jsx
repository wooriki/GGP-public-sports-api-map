import React, { useState, useEffect } from 'react';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

const YouTubeApi = () => {
  const [isMounted, setIsMounted] = useState(false); // 마운트 여부 상태
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  /////////////////// woori

  // 플레이리스트를 클릭했을 때 처리하는 함수
  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  // 플레이리스트 ID에 따른 유튜브 링크 생성 함수
  const getPlaylistLink = (playlistId) => {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  };

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCSGC87iX0QhnIfUOI_B_Rdg&maxResults=50&key=AIzaSyDG0fmpzvRTNpr4Aaj8DP_6ecKlnbbk4cg'
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
        setIsMounted(true); // 데이터를 받아온 후에 마운트된 것으로 설정
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  // 랜덤으로 list 셔플
  function shuffleArray(array) {
    const shuffledArray = array.slice(); // 원본 배열을 변경하지 않고 복사
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const shuffledPlaylist = shuffleArray(playlist);

  return (
    <>
      {isMounted && ( // 마운트된 후에만 랜덤하게 렌더링
        <UlMother>
          <UlTag>
            {shuffledPlaylist.slice(0, 5).map((item) => (
              <LiTag key={item.id}>
                <div onClick={() => handlePlaylistClick(item.id)}>
                  <ImgTag src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                  <SubTitle>{item.snippet.title}</SubTitle>
                </div>
              </LiTag>
            ))}
          </UlTag>
        </UlMother>
      )}
    </>
  );
};
// 업데이트
export default YouTubeApi;

const UlMother = styled.div``;

const UlTag = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 8px;
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
  // background-color: rgba(77, 77, 77, 0.776);
  border-radius: 14px 0 0;
`;

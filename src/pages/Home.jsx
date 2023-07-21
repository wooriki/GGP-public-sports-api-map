import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import { styled, keyframes } from 'styled-components';
import Facilities from '../components/Facilities';
import MapComponent from '../components/map/MapComponent';
import Detail from '../components/detail/Detail';
import Header from '../components/common/Header';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { location, error } = useCurrentLocation();
  const [facility, setFacility] = useState(null);
  const [filteredGlobalDataByArea, setFilteredGlobalDataByArea] = useState(null);
  const [globalSearch, setGlobalSearch] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // 마운트 여부 상태
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);

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
      <Header setFilteredGlobalDataByArea={setFilteredGlobalDataByArea} setGlobalSearch={setGlobalSearch} />
      <ContainerWrapper>
        <StyledMain>
          <div>
            <TitleTag>실시간 현황</TitleTag>
            <MapComponent />
          </div>
          <OptionalTag>
            <TextTag>💥추천 음악</TextTag>
            {isMounted && ( // 마운트된 후에만 랜덤하게 렌더링
              <UlTag>
                {/* <LiTag>
                <img src={i.snippet.thumbnails.high['url']} alt="" />
              </LiTag>
              <LiTag>2</LiTag>
              <LiTag>3</LiTag>
              <LiTag>4</LiTag>
              <LiTag>5</LiTag> */}
                {shuffledPlaylist.slice(0, 5).map((item) => (
                  <LiTag key={item.id} onClick={() => handlePlaylistClick(item.id)}>
                    <a href={getPlaylistLink(item.id)} target="_blank" rel="noopener noreferrer">
                      <ImgTag src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                      <SubTitle>{item.snippet.title}</SubTitle>
                    </a>
                  </LiTag>
                ))}
              </UlTag>
            )}
          </OptionalTag>
        </StyledMain>
        {facility ? (
          <Detail setFacility={setFacility} facility={facility} />
        ) : (
          <Facilities
            filteredGlobalDataByArea={filteredGlobalDataByArea}
            globalSearch={globalSearch}
            setFacility={setFacility}
          />
        )}
      </ContainerWrapper>
    </>
  );
};
// 마커에 대한 state
//

export default Home;

const ContainerWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(41, 41, 41, 0.747);
  padding: 0 0 0 30px;
  border-radius: 30px;
`;
const StyledMain = styled.main`
  width: 65%;
  color: rgba(236, 236, 236, 0.89);
  border-radius: 30px 0 0 30px;
`;
const TitleTag = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding: 10px 20px;
  width: 250px;
  // background-color: rgba(77, 77, 77, 0.776);
  border-radius: 14px 0 0;
`;
const OptionalTag = styled.div`
  margin-top: 40px;
`;
const TextTag = styled.h2`
  font-size: 1.5rem;
  margin-top: 20px;
`;
const UlTag = styled.ul`
  // display: flex;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
  width: 200px;
  height: 150px;
  cursor: pointer;
`;
const ImgTag = styled.img`
  width: 100%;
  // height: 140px;
  border: 1px black solid;
  margin: 40px 10px 8px;
  // padding: 40px 60px;
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
  margin-bottom: 20px;
  width: 250px;
  // background-color: rgba(77, 77, 77, 0.776);
  border-radius: 14px 0 0;
`;

// 에러나면 Home에서 export const Home 아니면 export default Home으로 바꾸기

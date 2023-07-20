import React from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import Facilities from '../components/Facilities';
// import Search from '../components/Search';
import { styled, keyframes } from 'styled-components';
import MapComponent from '../components/map/MapComponent';

const Home = () => {
  const dispatch = useDispatch();
  const { location, error } = useCurrentLocation();

  // const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);

  return (
    <>
      <ContainerWrapper>
        <StyledMain>
          {/* <div style={{
          display: 'flex'
        }}>
          <MapComponent setIsMarked={} />
          {
            isMarked ? <디테일 /> : <전체 />
          }
          <div>

          </div>

        </div> */}
          <TextTag>Now Loading Map</TextTag>
          <div>
            <MapComponent />
          </div>
          <TextTag>💥추천 영상</TextTag>
          <UlTag>
            <LiTag>1</LiTag>
            <LiTag>2</LiTag>
            <LiTag>3</LiTag>
            <LiTag>4</LiTag>
          </UlTag>
        </StyledMain>
        <Facilities />
      </ContainerWrapper>
    </>
  );
};
// 마커에 대한 state
//

export default Home;

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
const StyledMain = styled.div`
  // height: 100vh;
  // display: flex;
  // justify-content: space-evenly;
  // align-items: center;

  color: rgba(236, 236, 236, 0.89);
  background-color: rgba(41, 41, 41, 0.747);
  border-radius: 30px 0 0 30px;
  padding: 118px 30px;
  // margin-top: -50px;
`;
const TextTag = styled.h2`
  font-size: 1.5rem;
  margin-top: 20px;
`;
const UlTag = styled.ul`
  display: flex;
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
  border: 1px black solid;
  margin: 40px 10px 20px;
  padding: 40px 60px;
  border-radius: 10px;
  border: none;
  background-color: rgba(179, 179, 179, 0.476);
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
    background-color: rgba(225, 225, 225, 0.45);
  }
`;

// 에러나면 Home에서 export const Home 아니면 export default Home으로 바꾸기

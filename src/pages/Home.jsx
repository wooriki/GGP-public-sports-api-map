import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { setLocation } from '../redux/modules/userLocation';
import { styled } from 'styled-components';
import Facilities from '../components/Facilities';
import MapComponent from '../components/map/MapComponent';
import Detail from '../components/detail/Detail';
import Header from '../components/common/Header';
import YouTubeApi from '../components/common/YouTubeApi';

const Home = () => {
  const dispatch = useDispatch();
  const { location } = useCurrentLocation();
  const [facility, setFacility] = useState(null);
  const [filteredGlobalDataByArea, setFilteredGlobalDataByArea] = useState(null);
  const [globalSearch, setGlobalSearch] = useState(null);

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);

  return (
    <Mother>
      <Header
        setFilteredGlobalDataByArea={setFilteredGlobalDataByArea}
        setGlobalSearch={setGlobalSearch}
        setFacility={setFacility}
      />
      <ContainerWrapper>
        <StyledDivForLeft>
          <MapComponent />
          <StyledRecommendation>
            <div id="recommendation-title">
              <h2>💥GoGo PlayList</h2>
            </div>
            <YouTubeApi />
          </StyledRecommendation>
        </StyledDivForLeft>
        <StyledDivForRight>
          {facility ? (
            <Detail setFacility={setFacility} facility={facility} />
          ) : (
            <Facilities
              filteredGlobalDataByArea={filteredGlobalDataByArea}
              globalSearch={globalSearch}
              setFacility={setFacility}
            />
          )}
        </StyledDivForRight>
      </ContainerWrapper>
    </Mother>
  );
};
// 마커에 대한 state
//

export default Home;

const Mother = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  min-width: 1100px;
`;

const ContainerWrapper = styled.main`
  width: 85%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  border-radius: 20px;
  gap: 0.75rem;
`;

const StyledDivForLeft = styled.div`
  height: 100%;
  width: 60%;
  color: rgba(236, 236, 236, 0.89);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StyledRecommendation = styled.div`
  background-color: #18191bdc;
  border-radius: 20px;
  height: 30%;
  padding: 0 10px;

  #recommendation-title {
    height: 20%;
    margin-top: 10px;
    min-height: 50px;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const StyledDivForRight = styled.div`
  width: 40%;
  border-radius: 20px;
  overflow: auto;
`;

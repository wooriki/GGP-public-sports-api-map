import React from 'react';
import { styled, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import Search from '../Search';

const Header = ({ setFilteredGlobalDataByArea, setGlobalSearch, setFacility }) => {
  return (
    <WeatherContainer>
      <Link to="/">
        <ImgTag src={process.env.PUBLIC_URL + 'img/Logo.png'} alt="로고" />
      </Link>
      <Search
        setFilteredGlobalDataByArea={setFilteredGlobalDataByArea}
        setGlobalSearch={setGlobalSearch}
        setFacility={setFacility}
      />
      <Weather />
    </WeatherContainer>
  );
};

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
const WeatherContainer = styled.header`
  width: 85%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #18191bdc;
  padding: 16px 30px;
  border-radius: 30px;
`;

const ImgTag = styled.img`
  cursor: pointer;
  width: 180px;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
  }
`;

export default Header;

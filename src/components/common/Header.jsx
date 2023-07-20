import React from 'react';
import { styled, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import Search from '../Search';

const Header = ({ setFilteredGlobalDataByArea, setGlobalSearch }) => {
  return (
    <WeatherContainer>
      <Link to="/">
        <ImgTag src={process.env.PUBLIC_URL + 'img/Logo.png'} width="180" alt="로고" />
      </Link>
      <Search setFilteredGlobalDataByArea={setFilteredGlobalDataByArea} setGlobalSearch={setGlobalSearch} />
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
const WeatherContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 16px 30px;
  border-radius: 34px;
`;
const ImgTag = styled.img`
  cursor: pointer;
  &:hover {
    animation: ${growAnimation} 0.5s ease-in-out;
  }
`;

export default Header;

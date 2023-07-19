import React from 'react';
import { styled } from 'styled-components';
import Maps from './Maps';
import useFetchPublicData from '../../hooks/useFetchPublicData';

const MapComponent = () => {
  const { data, isLoading, isError, error } = useFetchPublicData();
  console.log({ data, isLoading, isError, error });
  return (
    <StyledDiv className="home-temp-div second">
      <Maps />
    </StyledDiv>
  );
};

export default MapComponent;

const StyledDiv = styled.div``;

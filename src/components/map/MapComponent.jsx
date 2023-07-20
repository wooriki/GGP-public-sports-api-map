import React from 'react';
import { styled } from 'styled-components';
import Maps from './Maps';

const MapComponent = () => {
  return (
    <StyledDiv>
      <Maps />
    </StyledDiv>
  );
};

export default MapComponent;

const StyledDiv = styled.div`
  width: 700px;
  height: 700px;
`;

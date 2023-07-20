import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Maps from './Maps';
import useGetCoords from '../../hooks/mapHooks/useGetCoords';

const MapComponent = () => {
  const fetchedCoords = useGetCoords(1, 10);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    setCoords(fetchedCoords);
  }, [fetchedCoords]);

  return (
    <StyledDiv>
      <Maps coords={coords} />
    </StyledDiv>
  );
};

export default MapComponent;

const StyledDiv = styled.div``;

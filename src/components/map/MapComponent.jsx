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
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </StyledDiv>
  );
};

export default MapComponent;

const StyledDiv = styled.div``;

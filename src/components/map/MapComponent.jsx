import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import Maps from './Maps';
import publicAPI from '../../axios/publicDataAPI';
import axios from 'axios';

const MapComponent = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await publicAPI('/1/500/');
      console.log(res);
      const geoCoords = `${res.data.ListPublicReservationSport.row[0].X},${res.data.ListPublicReservationSport.row[0].Y}`;

      const resp = await axios('http://localhost:3001', {
        params: {
          coords: geoCoords
        }
      });
      console.log(resp.data.results);
    };
    getData();
  }, []);

  return (
    <StyledDiv className="home-temp-div second">
      <Maps />
    </StyledDiv>
  );
};

export default MapComponent;

const StyledDiv = styled.div``;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { setLocation } from "../redux/modules/userLocation";

import Facilities from "../components/Facilities";
import Search from '../components/Search';

export const Home = () => {
  const dispatch = useDispatch();
  const location = useCurrentLocation();

  useEffect(() => {
    if (location) {
      dispatch(setLocation({ latitude: location.latitude, longitude: location.longitude }));
    }
  }, [dispatch, location]);  

  return (
    <>
      <h1>Home</h1>
      {/* <Facilities /> */}
    </>
  );
}
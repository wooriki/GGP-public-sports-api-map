import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/modules/userLocation";

import Reservation from "../components/Reservation";

const Home = () => {
  const dispatch = useDispatch();
  const location = useGeolocation();

  useEffect(() => {
    if (location.loaded) {
      dispatch(setLocation(location.coordinates));
    }
  }, [dispatch, location]);

  return (
    <>
      <h1>Home</h1>
      <Reservation />
    </>
  );
}

export default Home;
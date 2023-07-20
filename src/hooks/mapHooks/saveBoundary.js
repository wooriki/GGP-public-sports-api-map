import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { groupingCoords } from '../../redux/modules/maps/coordsGroup';

const useSaveBoundary = (tempArray) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tempArray) {
      dispatch(groupingCoords(tempArray));
    }
  }, [tempArray, dispatch]);
};

export default useSaveBoundary;

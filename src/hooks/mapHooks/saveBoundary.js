import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { groupingCoords } from '../../redux/modules/maps/coordsGroup';
// 인자에 있는 정보를 스토어에 저장
// 정보는 필수로 위도, 경도, id를 포함해야한다.

const useSaveBoundary = (pins) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (pins) {
      dispatch(groupingCoords(pins));
    }
  }, [pins, dispatch]);
};

export default useSaveBoundary;

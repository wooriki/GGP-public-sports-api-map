import { getData } from '../axios/publicDataAPI';
import { useQuery } from 'react-query';

const useFetchPublicData = () => {
  const { data, isLoading, isError, error } = useQuery(['publicData'], () => getData(1, 5));

  return { data, isLoading, isError, error };
};

export default useFetchPublicData;

// useQuery를 통해 데이터 가져오고 결과 값 보내주는 훅

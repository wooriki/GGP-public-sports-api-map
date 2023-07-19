import { getData } from '../axios/publicDataAPI';
import { useQuery } from 'react-query';

const useFetchPublicData = (from, to) => {
  const { data, isLoading, isError, error, isFetching } = useQuery(['publicData'], () => getData(from, to));

  return { data, isLoading, isError, error, isFetching };
};

export default useFetchPublicData;

// useQuery를 통해 데이터 가져오고 결과 값 보내주는 훅

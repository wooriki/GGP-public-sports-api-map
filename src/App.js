import './App.css';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NavermapsProvider } from 'react-naver-maps';
import { styled } from 'styled-components';
import GlobalStyle from './GlobalStyle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {/* // 네이버 지도 API 사용을 위해 NavermapsProvider로 감싸줍니다. */}
      <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}>
        <StyledDiv>
          <ReactQueryDevtools initialIsOpen={false} />
          <Router />
        </StyledDiv>
      </NavermapsProvider>
    </QueryClientProvider>
  );
};

const StyledDiv = styled.div`
  height: 100vh;
`;

export default App;

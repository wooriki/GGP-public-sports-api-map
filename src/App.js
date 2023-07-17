import { styled } from 'styled-components';
import './App.css';
import Router from './shared/Router';
import { NavermapsProvider } from 'react-naver-maps';

function App() {
  return (
    // 네이버 지도 API 사용을 위해 NavermapsProvider로 감싸줍니다.
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}>
      <StyledDiv>
        <Router />
      </StyledDiv>
    </NavermapsProvider>
  );
}

export default App;

const StyledDiv = styled.div`
  height: 100vh;
  background: rgb(15, 32, 39);
  background: linear-gradient(81deg, rgba(15, 32, 39, 1) 0%, rgba(32, 58, 67, 1) 50%, rgba(44, 83, 100, 1) 100%);
`;

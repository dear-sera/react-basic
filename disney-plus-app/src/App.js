import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <Nav />
      <Banner />
    </Container>
  );
}

export default App;

// position CSS은 태그를 어떻게 위치시킬지 정의
//relative는 자기 자신을 기준, absolute는 부모 기준, static은 기본값, 다른 태그와의 관계에 의해 자동, sticky는 스크롤 영역 기준
// :after는 가상요소로서 존재하지 않는 요소를 존재하는 것처럼 부여, 여기서는 이미지를 백그라운드에 넣기 위해 사용
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`
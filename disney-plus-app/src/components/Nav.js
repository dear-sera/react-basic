import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Nav = () => {
  
  const [show, setShow] = useState(false);

  useEffect(() => {  //useEffect는 react 컴포넌트가 렌더링 될 때마다 특정 작업을 실항하는 Hook
    window.addEventListener('scroll', () => {  //addEventListener는 이벤트가 발생하면 어떤(여기선 scroll) 함수를 호출할 건지 리스너를 등록하는 것
      if (window.scrollY > 50) {  //스크롤이 50이상 넘어가면 이벤트가 발생하여 show를 True변경하여 nav바에 배경 색을 줌
        setShow(true);
      } else {
        setShow(false);
      }
    })
    return () => {
      window.removeEventListener('scroll', () => {});  //컴포넌트를 사용하지 않을 때, 함수를 더 이상 호출되지 않게 리스너를 제거하는 것.
    }
  }, [])


  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          alt='Disney Plus Logo'
          src='/images/logo.svg'
          onClick={() => (window.location.href = "/")}  //로고를 누르면 기본 홈으로
        />
      </Logo>
    </NavWrapper>
  )
}

export default Nav

// styled-components는 js로 작성된 컴포넌트에 바로 삽입하는 스타일 기법 
//style.`은 html 엘리먼트나 react 컴포넌트에 원하는 스타일이 적용됨
// position CSS은 태그를 어떻게 위치시킬지 정의, fixed는 스크롤을 내려도 위에 고정되는 것
// show는 True/False로 변경하기 때문에 props에 따라서 if문으로 스크롤 50이하는 배경색, 50이하는 검은색으로 변경
const NavWrapper = styled.nav`  
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;


const Logo = styled.a`
  padding: 0; 
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
  `;
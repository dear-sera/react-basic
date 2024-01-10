import axios from '../api/axios';
import React from 'react'
import { useEffect, useState } from 'react'
import requests from '../api/request'
import "./Banner.css"
import styled from 'styled-components';

const Banner = () => {

  const [movie, setMovie] = useState([]);
  const [isClicked, setisClicked] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async() => {
    // 현재 상영중인 영화 정보 가져오기(20개)
    const response = await axios.get(requests.fetchNowPlaying) //미리 생성한 api를 통해 url가져오기
    // 여러 영화 중 영화 하나의 ID 가져오기 (20개 값 중 랜덤으로 가져오기)
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    // 특정 영화의 더 상세한 정보 가져오기(비디오 정보 포함)
    const {data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" }
    })
    setMovie(movieDetail);

  }

  // str이 있을 때, n개의 글자보다 길면 n개까지 자르고, 아니면 그대로
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  } 

  // 영상을 클릭 시, 영상을 보여주고, 아닐 시 기존 영화 정보 보여줌, X버튼 클릭시, 기존으로 돌아감
  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            width="640" 
            height="360" 
            frameborder="0" 
            allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setisClicked(false)}>X</button>
      </>
    )
  } else {
  //banner : API에서 가져온 영화의 이미지 가져오기
  //banner contents : 영화의 타이틀 혹은 이름 혹은 오리지날 이름 가져오기(앞에 것이 없으면 뒤에 것 가져오기)
  //banner_buttons : 영화에 비디오가 존재 시, play 버튼을 눌러 비디오가 나오게
  //banner_description : 영화 개요 가져오기, 100글자 이상이면 자르기
  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover"
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className='banner_buttons'>
          {movie?.videos?.results[0]?.key && 
            <button
              className='banner_button play'
              onClick={() => setisClicked(true)}
            >
              Play
            </button>
          }

        </div>
        <p className='banner_description'>
          {truncate(movie?.overview, 100)} 
        </p>
      </div>
          <div className='banner--fadeBottom' />
    </header>
  )
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div` 
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1,
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
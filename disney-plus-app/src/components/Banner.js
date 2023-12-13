import axios from '../api/axios';
import React from 'react'
import { useEffect } from 'react'
import requests from '../api/request'

const Banner = () => {

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = () => {
    const response = axios.get(requests.fetchNowPlaying) //미리 생성한 api를 통해 url가져오기
    console.log(response);
  }

  return (
    <div>Banner</div>
  )
}

export default Banner
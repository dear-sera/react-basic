//axios를 통한 themoviedb api 연결
//axios란 http 비동기 통신 라이브러리로 백엔드와 프론트엔드 통신을 쉽게 하기 위해 Ajax와 더불어 사용

import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",  //themoviedb api 기본 url
    params: {
        api_key: "d0d593b12ffa3dd3e235ab62b34ea0a7", // 발급받은 key
        language: "ko-KR"
    }
})

export default instance;
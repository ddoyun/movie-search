import { getMovies } from './getMovies.js';
import { renderMovies } from './renderMovies.js';

// API
// fetch('https://omdbapi.com/?apikey=7035c60c&s=frozen')
//   .then(res => res.json())
//   .then(res => console.log(res))
// await 사용시, 감싸는 함수에 async 삽입 필요

// 초기화 코드
export const loading = document.querySelector('.loading');
export const moviesEl = document.querySelector('.movies');
export const moreBtnEl = document.querySelector('.more');
const searchBtnEl = document.querySelector('.search-btn');
const selectYear = document.querySelector('.movies-years');
const selectCnt = document.querySelector('.movies-count');
const optionYear = new Date().getFullYear();

let title = '';
let page = 1;
let infiniteScroll = false;

// 년도 옵션
for (let i = optionYear; i > optionYear - 38; i--) {
  const yearEl = document.createElement('option');
  yearEl.value = i;
  yearEl.textContent = i;
  selectYear.append(yearEl);
}



// 검색 기능
document.querySelector('input').addEventListener('input', (e) => {
  title = e.target.value;
});
searchBtnEl.addEventListener('click', async () => {
  // 무한 스크롤
  infiniteScroll = true;

  if (title === '') {
    alert('제목을 입력해 주세요');
    moviesEl.innerHTML = "";  // 검색 타이틀 초기화
  } else {
    let year = selectYear.value;
    page = 1;  // 페이지 초기화

    // 영화 가져오기
    const getmovies = await getMovies(title, year, page);
    moviesEl.innerHTML = "";  // 검색 타이틀 초기화

    // 영화 리스트 랜더링
    renderMovies(getmovies, page, infiniteScroll);

    // 10,20,30 카운트 검색
    let pageShow = selectCnt.value;
    for (let i = 1; i < pageShow; i++) {
      moreMovies();
    }
  }
});

// 더보기 버튼
moreBtnEl.addEventListener('click', async () => {
  let pageShow = selectCnt.value;
  for (let i = 1; i <= pageShow; i++) {
    moreMovies();
  }
});

// 더보기 페이지 증가
async function moreMovies() {
  let year = selectYear.value;
  page += 1;

  // 영화 가져오기
  const getmovies = await getMovies(title, year, page);

  // 무한 스크롤
  let totalMovies = Number(getmovies.total);
  if ((totalMovies / 10) <= page) {
    infiniteScroll = false;
  }

  // 영화 리스트 랜더링
  renderMovies(getmovies, page, infiniteScroll);
}

// 무한 스크롤
// 1. 인터섹션 옵저버 생성
const io = new IntersectionObserver((entry, observer) => {
  // 3. 현재 보이는 target 출력
  const ioTarget = entry[0].target;
  // 4. viewport에 target이 보이면 하는 일
  console.log(infiniteScroll);
  if (entry[0].isIntersecting && infiniteScroll) {
    console.log('현재 보이는 타켓', ioTarget);
    // 5. 현재 보이는 target 감시 취소
    // io.unobserve(endEl);

    // 6. 더보기 페이지 증가
    let pageShow = selectCnt.value;
    for (let i = 1; i <= pageShow; i++) {
      moreMovies();
    }

    // 7. 새로 추가된 target 감시
    io.observe(moreBtnEl);
  }
}, {
  // 5. 타겟이 100% 보이면 실행
  threshold: 1
});
// 2. 타켓 감시
io.observe(moreBtnEl);
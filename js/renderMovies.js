import { moviesEl, loading, moreBtnEl } from './main.js';

export function renderMovies(movies, page, infiniteScroll) {
  // 총 영화 개수
  const totalMovies = Number(movies.total);

  // 로딩
  loading.classList.add('show');
  moreBtnEl.classList.remove('show');

  // 검색된 영화 없을 때
  if (moviesEl.hasChildNodes() && !movies.movies) {
    infiniteScroll = false;
    loading.classList.remove('show');
    moreBtnEl.classList.remove('show');
    console.log('마지막 페이지');
    return false;
  } else if (!movies.movies) {
    infiniteScroll = false;
    loading.classList.remove('show');
    moreBtnEl.classList.remove('show');
    alert('검색된 영화가 없습니다.');
    moviesEl.innerHTML = /* html */ `
       <span><img src="./images/search.png" /></span>
    `;
    return false;
  }

  for (const movie of movies.movies) {
    const el = document.createElement('div');
    const h1El = document.createElement('h1');
    const imgEl = document.createElement('img');

    // 영화 정보 뿌리기
    el.classList.add('movie');
    el.append(h1El, imgEl);

    // 영화 타이틀
    h1El.textContent = movie.Title;
    h1El.addEventListener('click', () => {
      console.log(movie.Title)
    });

    // 영화 포스터
    imgEl.src = movie.Poster;
    console.log(imgEl.src);
    if (imgEl.src === 'N/A') {
      console.log(imgEl.src);
      imgEl.src = './images/noImage.png';
    }

    // el.innerHTML = /* html */ `
    //   <h1>${movie.Title}</h1>
    //   <img src="${movie.Poster}" />
    // `;
    // const h1El = el.querySelector('h1');
    // h1El.addEventListener('click', () => {
    //   console.log(movie.Title)
    // })

    moviesEl.append(el);
  }
  // 로딩
  loading.classList.remove('show');

  // 마지막 페이지
  if ((totalMovies / 10) <= page) {
    moreBtnEl.classList.remove('show');
  } else {
    moreBtnEl.classList.add('show');
  }
}
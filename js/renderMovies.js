import { moviesEl, loading, moreBtnEl } from './main.js';

export function renderMovies(movies, page, infiniteScroll) {
  // 총 영화 개수
  const totalMovies = Number(movies.total);
  moreBtnEl.classList.remove('show');

  // 검색된 영화 없을 때
  if (moviesEl.hasChildNodes() && !movies.movies) {
    infiniteScroll = false;
    // 로딩
    loading.classList.remove('show');
    moreBtnEl.classList.remove('show');
    return;
  }

  if (!movies.movies) {
    infiniteScroll = false;
    // 로딩
    loading.classList.remove('show');
    moreBtnEl.classList.remove('show');
    alert('검색된 영화가 없습니다.');
    return;
  }

  for (const movie of movies.movies) {
    const el = document.createElement('div');
    const h1El = document.createElement('h1');
    const imgEl = document.createElement('img');

    // 영화 정보 뿌리기
    el.classList.add('movie');
    el.append(h1El, imgEl);

    // 영화 포스터
    imgEl.src = movie.Poster !== 'N/A' ? movie.Poster : './images/noImage.png';

    // 영화 타이틀
    h1El.textContent = movie.Title;
    h1El.addEventListener('click', () => {
      console.log(movie.Title)
    });

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
  // 마지막 페이지
  if ((totalMovies / 10) <= page) {
    moreBtnEl.classList.remove('show');
  } else {
    moreBtnEl.classList.add('show');
  }
}
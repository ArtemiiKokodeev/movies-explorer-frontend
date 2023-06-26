export const BASE_URL = process.env.NODE_ENV === 'production' ? 
'https://api.cinemaworld.nomoredomains.rocks/' : 
'http://localhost:3000/';

export const apiBeatFilmUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export const shortMovieDuration = 40;

export const windowSizeBreakpoints = {
  desktop: 1278,
  tablet: 767
}

export const moviesNumberToShow = {
  desktop: {
    firstSearch: 12,
    moreButton: 3
  },
  tablet: {
    firstSearch: 8,
    moreButton: 2
  },
  smartphone: {
    firstSearch: 5,
    moreButton: 2
  }
}

import {
  RESET_APP,
  LOADING,
  CHANGE_VALUE,
  ERROR,
  MAKE_REQUEST,
  MAKE_REQUEST_SUCCESS,
  MAKE_REQUEST_FAIL,
} from '../constants';

const INITAL_STATE = {
  loading: false,
  resetApp: false,
  errorMsg: '',
  popularArr: [],
  genresArr: [],
  upcommingArr: [],
  topRatedArr: [],
  popular_total_pages: 0,
  popular_current_page: 0,
  upcommig_total_pages: 0,
  upcommig_current_page: 0,
  top_rated_total_pages: 0,
  top_rated_current_page: 0,
  movieDetails: {},
  cast: [],
  crew: [],
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case RESET_APP:
      return {...INITAL_STATE, resetApp: true};
    case ERROR:
      return {...state, errorMsg: ''};
    case CHANGE_VALUE:
      return {...state, ...action.payload};
    case MAKE_REQUEST:
      return {...state, loading: true};
    case MAKE_REQUEST_SUCCESS:
      const data = action.payload.data;
      const newData = action.payload.newData;
      const endpointFlag = action.payload.endpointFlag;
      switch (endpointFlag) {
        case 'getPopular':
          return {
            ...state,
            loading: false,
            popularArr: newData ? newData : data.results,
            popular_total_pages: data.total_pages,
            popular_current_page: data.page,
          };
        case 'getUpcoming':
          return {
            ...state,
            loading: false,
            upcommingArr: newData ? newData : data.results,
            upcommig_total_pages: data.total_pages,
            upcommig_current_page: data.page,
          };
        case 'getTopRated':
          return {
            ...state,
            loading: false,
            topRatedArr: newData ? newData : data.results,
            top_rated_total_pages: data.total_pages,
            top_rated_current_page: data.page,
          };
        case 'getGeners':
          return {
            ...state,
            loading: false,
            genresArr: data.genres,
          };
        case 'getDetails':
          return {
            ...state,
            loading: false,
            movieDetails: data,
          };
        case 'getCredits':
          return {
            ...state,
            loading: false,
            cast: data.cast,
            crew: data.crew,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

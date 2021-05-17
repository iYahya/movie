import axios from 'axios';
import {
  CHANGE_VALUE,
  ERROR,
  MAKE_REQUEST,
  MAKE_REQUEST_FAIL,
  MAKE_REQUEST_SUCCESS,
} from '../constants';
import {headers, L, renderError as cAlert} from '../Config';
import {APIURL} from '../constants';

export function changeValue(object) {
  return {type: CHANGE_VALUE, payload: object};
}
export const makeRequest = (
  method,
  endpoint,
  data,
  token,
  endpointFlag,
  oldData,
) => {
  return dispatch => {
    dispatch({type: MAKE_REQUEST});
    if (method === 'POST' || method === 'PUT') {
      axios({
        url: APIURL + endpoint,
        // headers: headers,
        method: method,
        data: data ? data : {},
      })
        .then(function (res) {
          makeRequestSuccess(dispatch, res.data, endpointFlag);
        })
        .catch(function (error) {
          if (error.response && error.response) {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
          } else if (error.response && error.response.status === 401) {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
            // _logOut();
          } else {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
          }
        });
    } else {
      axios({
        url: APIURL + endpoint,
        // headers: headers,
        method: method,
        params: data ? data : {},
      })
        .then(function (res) {
          if (
            endpointFlag === 'getPopular' ||
            endpointFlag === 'getUpcoming' ||
            endpointFlag === 'getTopRated'
          ) {
            makeRequestSuccess(dispatch, res.data, endpointFlag, oldData);
          } else {
            makeRequestSuccess(dispatch, res.data, endpointFlag);
          }
        })
        .catch(function (error) {
          if (error.response && error.response) {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
          } else if (error.response && error.response.status === 401) {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
            // _logOut();
          } else {
            const errorMsg = error.response.data.status_message;
            cAlert(errorMsg);
          }
        });
    }
  };
};
const makeRequestSuccess = (dispatch, data, endpointFlag, oldData) => {
  let res;
  if (oldData && oldData.length > 0) {
    const newData = oldData.concat(data.results);
    res = {data, newData, endpointFlag};
  } else {
    res = {data, endpointFlag};
  }
  dispatch({
    type: MAKE_REQUEST_SUCCESS,
    payload: res,
  });
};

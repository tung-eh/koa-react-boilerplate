import { useReducer, useCallback, useEffect } from 'react';

const initialState = {
  loading: false,
};

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { loading: true };
    case FETCH_SUCCESS:
      return { loading: false, data: action.payload };
    case FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useFetcher = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const triggerFetch = useCallback((url, opts) => {
    dispatch({ type: FETCH_START });
    fetch(url, opts)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API returns errors.');
        }
      })
      .then(data => {
        dispatch({ type: FETCH_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_FAILED, payload: error });
      });
  }, []);

  return [triggerFetch, { loading, data, error }];
};

export const useFetch = (url, opts) => {
  const [fetcher, result] = useFetcher();

  const triggerFetch = useCallback(() => {
    fetcher(url, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, url, JSON.stringify(opts)]);

  return [triggerFetch, result];
};

export const useFetchOnMount = (
  url,
  { triggerFetchCondition = true, ...opts } = {}
) => {
  const [triggerFetch, result] = useFetch(url, opts);

  useEffect(() => {
    if (triggerFetchCondition) triggerFetch();
  }, [triggerFetch, url, triggerFetchCondition]);

  return result;
};

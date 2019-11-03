import { useEffect, useMemo } from 'react';

import { useFetch } from './useFetch';

export const usePost = (url, dataObj, successCb = () => {}, opts) => {
  const dataJson = JSON.stringify(dataObj);
  const fetchOpts = useMemo(
    () => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
      ...opts,
    }),
    [dataJson, opts]
  );
  const result = useFetch(url, fetchOpts);
  const [, { data }] = result;

  useEffect(() => {
    if (data) {
      successCb(data);
    }
  }, [data, successCb]);

  return result;
};

export default usePost;

import { useState, useEffect } from 'react';

type AsyncState<T> = {
  data: T | null;
  error: Error | null;
  isPending: boolean;
};

const useAsync = <T>(promiseFn: () => Promise<T>): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isPending: true
  });

  useEffect(() => {
    setState({ data: null, error: null, isPending: true });

    promiseFn()
      .then((data) => {
        setState({ data, error: null, isPending: false });
      })
      .catch((error) => {
        setState({ data: null, error, isPending: false });
      });
  }, [promiseFn]); // Always use an empty array literal here

  return state;
};

export default useAsync;

import { cloud } from '@tarojs/taro';
import { useState, useEffect, useCallback } from 'react';

function useCloudFunction<T>({ name, path, body, manual = false }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!manual) {
      run();
    }
  }, []);

  const run = useCallback(async () => {

    try {
      setLoading(true);
      setError('');
      const res = await cloud.callFunction({
        name: name,
        data: {
          $url: path,
          data: body,
        }
      });
      setLoading(false);
      if ((res.result as any)?.code === 200) {
        setError('');
        setData((res.result as any)?.data);
      } else {
        setError(res.errMsg);
      }
    } catch (e) {
      setLoading(false);
      setError(e);
    }

  }, [name, path, body]);

  return { error, data, run, loading };
}

export default useCloudFunction;

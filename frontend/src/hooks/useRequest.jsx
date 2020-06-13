import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (initUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchStuff = async () => {
      try {
        setLoading(true);
        const response = await axios(initUrl);
        if (!ignore) {
          setData(response.data)};
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStuff();
    return (() => { ignore = true; });
  }, [initUrl]);

  return { data, loading, error };
};
export default useRequest;
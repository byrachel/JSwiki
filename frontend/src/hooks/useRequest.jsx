import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (url) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios(url);
        if (!ignore) {
          setData(response.data)};
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return (() => { ignore = true; });
  }, [url]);

  return { data, loading, error };
};
export default useRequest;
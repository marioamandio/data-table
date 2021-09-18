import { useEffect, useState } from "react";
import axios from "axios";

export interface DataEntry {
  date_of_birth: string;
  email: string;
  id: number;
  industry: string;
  first_name: string;
  last_name: string;
  salary: number;
  years_of_experience: number;
}

export type Data = DataEntry[];

const useData = () => {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/data")
      .then(function (response: { data: Data }) {
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useData;

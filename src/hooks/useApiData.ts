"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

interface UseApiDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useApiData<T>(endpoint: string): UseApiDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.get<T>(endpoint);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof ApiError ? err.message : "Gagal memuat data");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, isLoading, error };
}
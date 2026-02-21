import React from "react";
import { useQuery } from "@tanstack/react-query";

export const useUspBarData = (queryKey, queryFn, setSnackBar, options = {}) => {
  const { enabled = true, staleTime = 0 } = options;

  // Call useQuery at the top level
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: queryFn,
    enabled: enabled,
    staleTime: staleTime,
    // Refetch every time component mounts
    refetchOnMount: true,
    // Optional: Prevent retries to stop repeated error cycles during debugging
    retry: false,
  });

  const errorMessage = error?.message;
  React.useEffect(() => {
    if (errorMessage && setSnackBar) {
      setSnackBar((prev) => {
        if (prev.message === errorMessage && prev.open) return prev;

        return {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      });
    }
  }, [errorMessage, setSnackBar]);

  return { error, data, isLoading, refetch };
};
export default useUspBarData;

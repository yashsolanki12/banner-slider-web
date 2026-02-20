import React from "react";
import { useQuery } from "@tanstack/react-query";

export const useUspBarData = (queryKey, queryFn, setSnackBar) => {
  // Call useQuery at the top level
  const query = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    // use useEffect to watch the error state.
  });
  const { error, data, isLoading } = query;

  // Handle Side effect (like snack)
  React.useEffect(() => {
    if (error && setSnackBar) {
      console.error(`${queryKey} data fetching error:`, error);
      setSnackBar({
        open: true,
        message: error.message || "Failed to load data",
        severity: "error",
      });
    }
  }, [error, queryKey, setSnackBar]);
  return { error, data, isLoading };
};

export default useUspBarData;

import React from "react";
import { useQuery } from "@tanstack/react-query";

export const useUspBarData = (queryKey, queryFn, setSnackBar) => {
  // Call useQuery at the top level
  const { error, data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
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
  }, [errorMessage, setSnackBar]); // queryKey removed as it's implied by errorMessage

  return { error, data, isLoading };
};
export default useUspBarData;

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUspBarSubmit = (mutationFn, setSnackBar, options = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, invalidateKeys = [] } = options;

  const mutation = useMutation({
    mutationFn,
    onError: (error) => {
      setSnackBar({
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      });
    },
    onSuccess: (data) => {
      // Show success snackbar FIRST
      setSnackBar({
        open: true,
        message: data?.message || "Operation successful",
        severity: "success",
      });

      // Invalidate queries AFTER snackbar is shown (with delay)
      if (invalidateKeys.length > 0) {
        setTimeout(() => {
          invalidateKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: key });
          });
        }, 3000); // Delay to let snackbar show first
      }

      // Call custom onSuccess AFTER delay (navigation)
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(data);
        }, 4000); // Delay to let snackbar show first
      }
    },
  });

  return mutation;
};

export default useUspBarSubmit;

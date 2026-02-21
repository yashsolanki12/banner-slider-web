import { z } from "zod";

// Zod validation schema for USP Bar - matches backend validation
export const uspBarSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

// Validate form data and return errors object
export const validateUspBarForm = (data) => {
  try {
    uspBarSchema.parse(data);
    return { errors: null, isValid: true };
  } catch (error) {
    // Handle ZodError - works with both Zod v3 and v4
    const zodErrors = error.issues || error.errors || [];

    if (zodErrors.length > 0) {
      const errors = {};
      zodErrors.forEach((err) => {
        const field = err.path?.[0];
        if (field) {
          errors[field] = err.message;
        }
      });
      return { errors, isValid: false };
    }

    return { errors: { general: "Validation error" }, isValid: false };
  }
};

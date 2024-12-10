export type ErrorType = {
  type: string;
  message: string;
};

export const nonEmptyString = (value: string): ErrorType | null => {
  if (!value || !/\S/.test(value)) {
    return {
      type: "required",
      message: "Required field.",
    };
  }
  return null;
};

export const nonNegativeNumber = (value: number): ErrorType | null => {
  if (value < 0) {
    return {
      type: "number",
      message: "Value must not be less than 0.",
    };
  }
  return null;
};

export const noLateStartDate = (
  payBeginDate: string,
  payEndDate: string
): ErrorType | null => {
  if (new Date(payBeginDate) > new Date(payEndDate)) {
    return {
      type: "date",
      message: "Invalid start date.",
    };
  }
  return null;
};

export const noEarlyEndDate = (
  payEndDate: string,
  payBeginDate: string
): ErrorType | null => {
  if (new Date(payEndDate) < new Date(payBeginDate)) {
    return {
      type: "date",
      message: "Invalid end date.",
    };
  }
  return null;
};

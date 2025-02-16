export const validateFields = (fields: any, requiredFields: string[]) => {
  let valid = true;
  for (const field of requiredFields) {
    if (!fields[field]) {
      valid = false;
    }
  }
  return valid;
};

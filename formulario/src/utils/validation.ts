export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Basic Brazilian phone validation - accepts formats like:
  // (00) 00000-0000 or 00 00000-0000 or 00000000000
  const phoneRegex = /^(?:\(?([0-9]{2})\)?\s?)?(?:[0-9]{4,5}-?[0-9]{4})$/;
  return phoneRegex.test(phone);
};
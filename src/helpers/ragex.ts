function isValidateEmail(email: string) {
  const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRagex.test(email);
}

function isValidatePassword(password: string) {
  const passwordRagex = /^.{6,}$/;
  return passwordRagex.test(password);
}

export const ragex = { isValidateEmail, isValidatePassword };

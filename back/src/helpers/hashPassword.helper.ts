import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const checkPassword = async (
  receivedPassword: string,
  storedPassword: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(receivedPassword, storedPassword);
  return result;
};

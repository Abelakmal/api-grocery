import bcrypt from 'bcrypt'
export const hashPassword = async (password: string): Promise<string> => {
  const saltRoundes = 10;
  return await bcrypt.hash(password, saltRoundes);
};

export const comparePassword = async (
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};
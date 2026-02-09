import { genSalt, hash, compare } from 'bcryptjs';

const SALT_RANDOMS = 8;

export async function hashPassword(password: string): Promise<string> {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return hash(password, saltGenerated);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

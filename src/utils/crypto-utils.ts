import bcrypt from "bcrypt";

export async function hashOTP(otp: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(otp, saltRounds);
}

export async function verifyOTP(otp: string, hash: string): Promise<boolean> {
  return bcrypt.compare(otp, hash);
}

export function generateOTP(): string {
  return Math.random().toString(36).slice(-6).toUpperCase(); // 6-character alphanumeric OTP
}
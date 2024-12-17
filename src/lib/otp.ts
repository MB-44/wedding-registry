export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOTP = (phoneNumber: string, otp: string) => {
  console.log(`Sending OTP ${otp} to ${phoneNumber}`);
};

import dotenv from 'dotenv'

dotenv.config()

export async function sendOtpSms({ mobile, otp, context }) {
  const provider = process.env.SMS_PROVIDER || 'mock'

  if (provider === 'mock') {
    console.log(`[OTP:${context}] ${mobile} => ${otp}`)
    return { ok: true, provider: 'mock', note: 'OTP printed in server console' }
  }

  return {
    ok: false,
    provider,
    note: 'SMS provider integration is not configured. Set SMS_PROVIDER=mock or integrate provider credentials.',
  }
}

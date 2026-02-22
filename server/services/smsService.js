import dotenv from 'dotenv'

dotenv.config()

export async function sendOtpSms({ mobile, otp, context }) {
  const provider = process.env.SMS_PROVIDER || 'mock'

  if (provider === 'mock') {
    console.log(`[OTP:${context}] ${mobile} => ${otp}`)
    return { ok: true, provider: 'mock', note: 'OTP printed in server console' }
  }

  if (provider === 'twilio') {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_FROM_NUMBER

    if (!accountSid || !authToken || !fromNumber) {
      return {
        ok: false,
        provider,
        note: 'Twilio is selected but credentials are missing. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER.',
      }
    }

    const authValue = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
    const body = new URLSearchParams({
      To: mobile,
      From: fromNumber,
      Body: `Your NutriVerse ${context} OTP is ${otp}. Valid for ${process.env.OTP_TTL_MINUTES || 5} minutes.`,
    })

    try {
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authValue}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        },
      )

      if (!response.ok) {
        const errorPayload = await response.text()
        return {
          ok: false,
          provider,
          note: `Twilio SMS failed: ${errorPayload}`,
        }
      }

      return { ok: true, provider }
    } catch (error) {
      return {
        ok: false,
        provider,
        note: `Twilio request failed: ${error.message}`,
      }
    }
  }

  return {
    ok: false,
    provider,
    note: `Unsupported SMS provider '${provider}'. Use SMS_PROVIDER=mock or SMS_PROVIDER=twilio.`,
  }
}

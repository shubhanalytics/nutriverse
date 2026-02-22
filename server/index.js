import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import pool from './db.js'
import { sendOtpSms } from './services/smsService.js'

dotenv.config()

const app = express()
const port = Number(process.env.SERVER_PORT || 5000)
const otpTtlMinutes = Number(process.env.OTP_TTL_MINUTES || 5)
const jwtSecret = process.env.JWT_SECRET || 'change-me-in-env'

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      mobile VARCHAR(13) NOT NULL UNIQUE,
      address VARCHAR(255) NOT NULL,
      pincode CHAR(6) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS otp_codes (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      mobile VARCHAR(13) NOT NULL,
      otp CHAR(6) NOT NULL,
      purpose ENUM('signup','login') NOT NULL,
      payload_json JSON NULL,
      is_used TINYINT(1) DEFAULT 0,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_mobile_purpose (mobile, purpose),
      INDEX idx_expires (expires_at)
    )
  `)
}

app.use(cors())
app.use(express.json())

const mobileRegex = /^\+91\d{10}$/
const pincodeRegex = /^\d{6}$/

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function normalizeIndianMobile(rawMobile) {
  const digits = String(rawMobile || '').replace(/\D/g, '')
  if (digits.length === 10) {
    return `+91${digits}`
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`
  }
  if (String(rawMobile || '').startsWith('+91') && String(rawMobile || '').slice(3).match(/^\d{10}$/)) {
    return String(rawMobile)
  }
  return null
}

async function createOtp({ mobile, purpose, payload = null, otp = generateOtp() }) {
  const expiresAt = new Date(Date.now() + otpTtlMinutes * 60 * 1000)

  const [result] = await pool.query(
    `INSERT INTO otp_codes (mobile, otp, purpose, payload_json, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    [mobile, otp, purpose, payload ? JSON.stringify(payload) : null, expiresAt],
  )

  return { id: result.insertId, otp }
}

async function getLatestValidOtp({ mobile, purpose }) {
  const [rows] = await pool.query(
    `SELECT *
     FROM otp_codes
     WHERE mobile = ?
       AND purpose = ?
       AND is_used = 0
       AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`,
    [mobile, purpose],
  )

  return rows[0] || null
}

async function markOtpUsed(id) {
  await pool.query('UPDATE otp_codes SET is_used = 1 WHERE id = ?', [id])
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: 'connected' })
  } catch {
    res.status(500).json({ ok: false, db: 'disconnected' })
  }
})

app.post('/api/auth/signup/request-otp', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim()
    const address = String(req.body.address || '').trim()
    const pincode = String(req.body.pincode || '').trim()
    const mobile = normalizeIndianMobile(req.body.mobile)

    if (!name || !address || !pincode || !mobile) {
      return res.status(400).json({ message: 'All fields are mandatory.' })
    }

    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: 'Mobile number must be in +91XXXXXXXXXX format.' })
    }

    if (!pincodeRegex.test(pincode)) {
      return res.status(400).json({ message: 'Pincode must be exactly 6 digits.' })
    }

    const [existingRows] = await pool.query('SELECT id FROM users WHERE mobile = ?', [mobile])
    if (existingRows.length > 0) {
      return res.status(409).json({ message: 'User already exists. Please login.' })
    }

    const payload = { name, address, pincode }
    const generatedOtp = generateOtp()
    const smsResult = await sendOtpSms({ mobile, otp: generatedOtp, context: 'signup' })

    if (!smsResult.ok) {
      return res.status(502).json({ message: 'Unable to deliver OTP right now. Please try again shortly.' })
    }

    const { otp } = await createOtp({ mobile, purpose: 'signup', payload, otp: generatedOtp })

    res.json({
      message: 'OTP sent for signup verification.',
      mobile,
      devOtp: smsResult.provider === 'mock' ? otp : undefined,
      provider: smsResult.provider,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to request signup OTP.' })
  }
})

app.post('/api/auth/signup/verify-otp', async (req, res) => {
  try {
    const mobile = normalizeIndianMobile(req.body.mobile)
    const otpInput = String(req.body.otp || '').trim()

    if (!mobile || !/^\d{6}$/.test(otpInput)) {
      return res.status(400).json({ message: 'Valid mobile and 6-digit OTP are required.' })
    }

    const otpRecord = await getLatestValidOtp({ mobile, purpose: 'signup' })
    if (!otpRecord || otpRecord.otp !== otpInput) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' })
    }

    const payload = otpRecord.payload_json || {}
    const profile = typeof payload === 'string' ? JSON.parse(payload) : payload

    await pool.query(
      'INSERT INTO users (name, mobile, address, pincode) VALUES (?, ?, ?, ?)',
      [profile.name, mobile, profile.address, profile.pincode],
    )

    await markOtpUsed(otpRecord.id)

    res.json({ message: 'Signup successful. Please login with mobile OTP.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to verify signup OTP.' })
  }
})

app.post('/api/auth/login/request-otp', async (req, res) => {
  try {
    const mobile = normalizeIndianMobile(req.body.mobile)

    if (!mobile || !mobileRegex.test(mobile)) {
      return res.status(400).json({ message: 'Enter a valid +91 mobile number.' })
    }

    const [users] = await pool.query('SELECT id FROM users WHERE mobile = ?', [mobile])
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.', showSignup: true })
    }

    const generatedOtp = generateOtp()
    const smsResult = await sendOtpSms({ mobile, otp: generatedOtp, context: 'login' })

    if (!smsResult.ok) {
      return res.status(502).json({ message: 'Unable to deliver OTP right now. Please try again shortly.' })
    }

    const { otp } = await createOtp({ mobile, purpose: 'login', otp: generatedOtp })

    res.json({
      message: 'OTP sent for login.',
      mobile,
      devOtp: smsResult.provider === 'mock' ? otp : undefined,
      provider: smsResult.provider,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to request login OTP.' })
  }
})

app.post('/api/auth/login/verify-otp', async (req, res) => {
  try {
    const mobile = normalizeIndianMobile(req.body.mobile)
    const otpInput = String(req.body.otp || '').trim()

    if (!mobile || !/^\d{6}$/.test(otpInput)) {
      return res.status(400).json({ message: 'Valid mobile and 6-digit OTP are required.' })
    }

    const otpRecord = await getLatestValidOtp({ mobile, purpose: 'login' })
    if (!otpRecord || otpRecord.otp !== otpInput) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' })
    }

    const [users] = await pool.query(
      'SELECT id, name, mobile, address, pincode, created_at FROM users WHERE mobile = ? LIMIT 1',
      [mobile],
    )

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' })
    }

    await markOtpUsed(otpRecord.id)

    const user = users[0]
    const token = jwt.sign({ userId: user.id, mobile: user.mobile }, jwtSecret, { expiresIn: '7d' })

    res.json({ message: 'Login successful.', token, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to verify login OTP.' })
  }
})

app.get('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ message: 'Missing auth token.' })
    }

    const decoded = jwt.verify(token, jwtSecret)
    const [rows] = await pool.query(
      'SELECT id, name, mobile, address, pincode, created_at FROM users WHERE id = ? LIMIT 1',
      [decoded.userId],
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' })
    }

    res.json({ user: rows[0] })
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' })
  }
})

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth server running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to initialize database tables:', error.message)
    process.exit(1)
  })

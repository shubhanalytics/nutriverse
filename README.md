# NutriVerse - Premium Dryfruits Website

**Live Website:** https://shubhanalytics.github.io/nutriverse/

A modern, responsive e-commerce website for premium dryfruits including almonds, cashews, walnuts, pistachios, and custom gift boxes.

## Features

- Sticky navigation with smooth tab-based scrolling
- Dynamic product pricing with quantity selection
- Bulk order contact section with WhatsApp integration
- OTP-based Login and Signup with MySQL user storage
- User profile validation against database records
- Service highlights with icons
- GitHub Pages deployment
- Built with React + Vite for fast performance

## Auth + MySQL Setup

1. Copy `.env.example` to `.env`
2. Fill these required MySQL details:
	- `MYSQL_HOST`
	- `MYSQL_PORT`
	- `MYSQL_USER`
	- `MYSQL_PASSWORD`
	- `MYSQL_DATABASE`
3. Set `JWT_SECRET` to a strong secret key
4. For OTP in development use `SMS_PROVIDER=mock` (OTP appears in backend console)
5. For real OTP delivery set `SMS_PROVIDER=twilio` and configure:
	- `TWILIO_ACCOUNT_SID`
	- `TWILIO_AUTH_TOKEN`
	- `TWILIO_FROM_NUMBER`
5. Start app and backend together:

```bash
npm run dev:full
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## What gets stored in MySQL

On signup, these fields are saved automatically in table `users`:
- `name`
- `mobile` (`+91` + 10 digits)
- `address`
- `pincode`
- `created_at`

OTP data is stored in table `otp_codes` with expiry for signup/login verification.

## SMS Provider Integration (Production)

Real OTP sending is implemented with Twilio in `server/services/smsService.js`.

- Development: `SMS_PROVIDER=mock` (OTP printed in backend logs)
- Production: `SMS_PROVIDER=twilio` with valid Twilio credentials

Important behavior:
- Login/Signup OTP is saved only after SMS delivery succeeds
- If SMS delivery fails, API returns error and login is blocked until OTP is delivered

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

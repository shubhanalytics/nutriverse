# NutriVerse Website (Informative-Only)

Live Website: https://shubhanalytics.github.io/nutriverse/

NutriVerse is a responsive, informative-only website for showcasing dryfruit products, quality standards, store locations, and contact details.

## Website Intent

- Informative browsing only (no online checkout)
- Product discovery and trust building
- WhatsApp-first communication for enquiries and purchase discussion

## Key Features

- Sticky section-based navigation with smooth scrolling
- Hero section with clear "informative-only" messaging
- Product catalog cards with highlights (no cart/order flow)
- Quality assurance section
- Store locations carousel
- Contact section + floating WhatsApp CTA
- Customer feedback and service promise blocks

## Run Frontend

```bash
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## Optional Backend (Not Required for Current Website UX)

A backend exists in `server/` for OTP auth experiments, but it is not required for the current informative-only website.

Run both frontend and backend if needed:

```bash
npm run dev:full
```

## Suggested Production Configuration

- Keep WhatsApp number updated in `src/App.jsx`
- Replace placeholder phone/email/address with final business details
- Add working links for Privacy Policy and Terms pages
- Keep product photos optimized in `public/assets/`

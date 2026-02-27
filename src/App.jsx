import { useEffect, useRef, useState } from 'react'
import './index.css'

const ASSET_BASE = import.meta.env.BASE_URL

const sectionBackgrounds = {
  home: `${ASSET_BASE}assets/bg-new.jpg`,
  'about-us': `${ASSET_BASE}assets/image-1.jpg`,
  products: `${ASSET_BASE}assets/image-1.jpg`,
  quality: `${ASSET_BASE}assets/bg-new.jpg`,
  faq: `${ASSET_BASE}assets/image-1.jpg`,
  locations: `${ASSET_BASE}assets/image-1.jpg`,
  'contact-us': `${ASSET_BASE}assets/bg-new.jpg`,
}

const sectionBackgroundPositions = {
  home: 'center 22%',
  'about-us': 'center 35%',
  products: 'center 40%',
  quality: 'center 24%',
  faq: 'center 36%',
  locations: 'center 36%',
  'contact-us': 'center 30%',
}

const sectionBackgroundPositionsMobile = {
  home: 'center 28%',
  'about-us': 'center 22%',
  products: 'center 26%',
  quality: 'center 30%',
  faq: 'center 24%',
  locations: 'center 24%',
  'contact-us': 'center 30%',
}

const tabs = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About Us', sectionId: 'about-us' },
  { label: 'Products', sectionId: 'products' },
  { label: 'Quality', sectionId: 'quality' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'Locations', sectionId: 'locations' },
  { label: 'Contact', sectionId: 'contact-us' },
]

const products = [
  {
    name: 'California Almonds',
    details: 'Protein-rich crunchy almonds for daily snacking and breakfast.',
    image: `${ASSET_BASE}assets/almonds.jpg`,
    highlights: ['Naturally crunchy', 'Popular for soaked use', 'Available in gift jars'],
  },
  {
    name: 'Premium Cashews',
    details: 'W240 and W320 grade handpicked whole cashews.',
    image: `${ASSET_BASE}assets/cashews.jpg`,
    highlights: ['Creamy texture', 'Uniform size selection', 'Great for festive gifting'],
  },
  {
    name: 'Roasted Pistachios',
    details: 'Salted premium pistachios with natural flavor and crunch.',
    image: `${ASSET_BASE}assets/pistachios.jpg`,
    highlights: ['Fresh roast batches', 'Balanced salt profile', 'Snack-ready packs'],
  },
  {
    name: 'Walnut Kernels',
    details: 'Omega-rich walnut halves ideal for smoothies and salads.',
    image: `${ASSET_BASE}assets/walnuts.jpg`,
    highlights: ['Naturally nutritious', 'Selected half kernels', 'Suitable for baking use'],
  },
  {
    name: 'Afghan Raisins',
    details: 'Naturally sweet seedless raisins for desserts and snacking.',
    image: `${ASSET_BASE}assets/raisins.jpg`,
    highlights: ['Naturally sweet', 'Kids-friendly option', 'Good for bakery use'],
  },
  {
    name: 'Premium Dates',
    details: 'Rich and creamy premium dates with natural sweetness.',
    image: `${ASSET_BASE}assets/dates.jpg`,
    highlights: ['Soft texture', 'No added sugar', 'Daily energy snack'],
  },
  {
    name: 'Fresh Figs',
    details: 'Dried figs with natural sweetness, perfect for snacking and cooking.',
    image: `${ASSET_BASE}assets/figs.jpg`,
    highlights: ['Fiber-rich option', 'Naturally sweet', 'Pairs well with nuts'],
  },
]

const qualityPoints = [
  'Sourced from verified farms and import partners',
  'Batch-wise freshness checks and moisture control',
  'Food-grade packaging with daily handling hygiene',
  'No stale stock policy with regular rotation',
]

const stores = [
  {
    branch: 'NutriVerse Mumbai',
    address: 'Shop 5, Bandra Kurla Complex, Mumbai - 400051',
    hours: '10:00 AM – 9:30 PM',
    phone: '+91 98234-111-321',
  },
  {
    branch: 'NutriVerse Bangalore',
    address: 'Unit 8, MG Road, Bangalore - 560001',
    hours: '9:30 AM – 9:00 PM',
    phone: '+91 98456-222-654',
  },
  {
    branch: 'NutriVerse Delhi',
    address: 'Shop 12, Connaught Place, New Delhi - 110001',
    hours: '11:00 AM – 10:00 PM',
    phone: '+91 98567-333-987',
  },
  {
    branch: 'NutriVerse Hyderabad',
    address: 'Kiosk 7, HITEC City, Hyderabad - 500081',
    hours: '10:00 AM – 9:00 PM',
    phone: '+91 98789-444-256',
  },
]

const customerFeedback = [
  {
    name: 'Rajesh Kumar',
    product: 'California Almonds',
    rating: 5,
    note: 'Fresh taste and consistent quality. My family includes these daily.',
  },
  {
    name: 'Priya Sharma',
    product: 'Premium Cashews',
    rating: 5,
    note: 'Uniform size and rich taste. Packaging quality feels premium.',
  },
  {
    name: 'Arjun Patel',
    product: 'Roasted Pistachios',
    rating: 5,
    note: 'Excellent flavor and clean roasting profile. Great snack option.',
  },
  {
    name: 'Sneha Gupta',
    product: 'Walnut Kernels',
    rating: 4,
    note: 'Good quality kernels and very useful for breakfast bowls.',
  },
]

const serviceHighlights = [
  {
    title: 'Premium Quality',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 3 6v6c0 5 3.4 9.7 9 11 5.6-1.3 9-6 9-11V6l-9-4Zm0 3.2 5.8 2.6v4.2c0 3.7-2.3 7.2-5.8 8.4-3.5-1.2-5.8-4.7-5.8-8.4V7.8L12 5.2Zm-1.1 9.7-2-2 1.4-1.4 1.2 1.2 2.8-2.8 1.4 1.4-4.2 4.2-.6-.6Z" />
      </svg>
    ),
  },
  {
    title: 'Fresh Daily Handling',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h11v8h2.3l2.7 2.7V20h-1.2a3 3 0 1 1-6 0H9.2a3 3 0 1 1-6 0H2V7c0-.6.4-1 1-1Zm12.5 2v4H20l-2-4h-2.5ZM6.2 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm8.6 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
      </svg>
    ),
  },
  {
    title: 'Transparent Advice',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4a8 8 0 0 1 7.8 6H22l-3.3 3.3L15.4 10h2.4A6 6 0 1 0 12 18a6 6 0 0 0 4.7-2.3l1.6 1.2A8 8 0 1 1 12 4Z" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp Assistance',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 0 1 9 9v4a3 3 0 0 1-3 3h-2v-7h3a7 7 0 1 0-14 0h3v8a3 3 0 0 0 3 3h2v-2h-2a1 1 0 0 1-1-1v-1H6a3 3 0 0 1-3-3v-4a9 9 0 0 1 9-9Z" />
      </svg>
    ),
  },
]

const homeFloatingDryfruits = [
  { name: 'Almonds', image: `${ASSET_BASE}assets/almonds.jpg` },
  { name: 'Cashews', image: `${ASSET_BASE}assets/cashews.jpg` },
  { name: 'Pistachios', image: `${ASSET_BASE}assets/pistachios.jpg` },
  { name: 'Walnuts', image: `${ASSET_BASE}assets/walnuts.jpg` },
]

const WHATSAPP_LINK =
  'https://wa.me/919926494791?text=Hello%2C%20I%20want%20to%20know%20more%20about%20NutriVerse%20products.'

const BUSINESS_INFO = {
  email: 'hello@nutriverse.in',
  primaryPhoneDisplay: '+91 98234-111-321',
  primaryPhoneTel: '+9198234111321',
  mainStoreAddress: 'Shop 14, Central Market Road, Mumbai - 400001',
  whatsappHours: '10:00 AM – 8:00 PM',
}

const LEGAL_LINKS = {
  privacy: `${ASSET_BASE}privacy-policy.html`,
  terms: `${ASSET_BASE}terms-conditions.html`,
  websiteInfo: `${ASSET_BASE}website-info.html`,
}

const faqItems = [
  {
    question: 'Do you accept online orders on this website?',
    answer:
      'No. This website is informational only. For stock checks and purchase discussion, please use WhatsApp.',
  },
  {
    question: 'How can I know today\'s prices and availability?',
    answer:
      'Our team shares current pricing and availability directly on WhatsApp based on your product and quantity needs.',
  },
  {
    question: 'Do you support festive and corporate gifting?',
    answer:
      'Yes, we assist with custom gifting assortments. Share your requirement on WhatsApp for guidance.',
  },
  {
    question: 'Can I visit a store and buy directly?',
    answer:
      'Yes. You can visit listed locations during store hours and connect beforehand on WhatsApp for confirmation.',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [loadedBackgrounds, setLoadedBackgrounds] = useState({})
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const locationScrollContainerRef = useRef(null)

  const getLocationCards = (container) => Array.from(container.querySelectorAll('.card'))

  const getNearestLocationIndex = (container) => {
    const cards = getLocationCards(container)
    if (cards.length === 0) {
      return 0
    }

    const currentLeft = container.scrollLeft
    let nearestIndex = 0
    let smallestDelta = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const delta = Math.abs(card.offsetLeft - currentLeft)
      if (delta < smallestDelta) {
        smallestDelta = delta
        nearestIndex = index
      }
    })

    return nearestIndex
  }

  useEffect(() => {
    Object.entries(sectionBackgrounds).forEach(([key, url]) => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        setLoadedBackgrounds((current) => ({
          ...current,
          [key]: true,
        }))
      }
    })
  }, [])

  useEffect(() => {
    const checkScrollability = () => {
      if (locationScrollContainerRef.current) {
        const container = locationScrollContainerRef.current
        const currentScroll = Math.round(container.scrollLeft)
        const maxScroll = container.scrollWidth - container.clientWidth
        setCanScrollLeft(currentScroll > 2)
        setCanScrollRight(currentScroll < maxScroll - 2)
      }
    }

    const container = locationScrollContainerRef.current
    const timer = setTimeout(checkScrollability, 100)
    container?.addEventListener('scroll', checkScrollability, { passive: true })
    window.addEventListener('resize', checkScrollability)

    return () => {
      clearTimeout(timer)
      container?.removeEventListener('scroll', checkScrollability)
      window.removeEventListener('resize', checkScrollability)
    }
  }, [])

  const goToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMobileNavOpen(false)

    const section = document.getElementById(sectionId)
    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    section.classList.add('section-flash')
    window.setTimeout(() => {
      section.classList.remove('section-flash')
    }, 950)
  }

  const handleLocationScroll = (direction) => {
    if (locationScrollContainerRef.current) {
      const container = locationScrollContainerRef.current
      const cards = getLocationCards(container)
      const maxScroll = container.scrollWidth - container.clientWidth
      const currentIndex = getNearestLocationIndex(container)
      const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1
      const clampedIndex = Math.max(0, Math.min(nextIndex, cards.length - 1))
      const targetPos = cards[clampedIndex]?.offsetLeft ?? 0
      const clampedPos = Math.max(0, Math.min(targetPos, maxScroll))

      container.scrollTo({ left: clampedPos, behavior: 'smooth' })
      setCanScrollLeft(clampedPos > 0)
      setCanScrollRight(clampedPos < maxScroll)
    }
  }

  const activeBackground = sectionBackgrounds[activeSection] || sectionBackgrounds.home
  const activeBackgroundPosition = sectionBackgroundPositions[activeSection] || sectionBackgroundPositions.home
  const activeBackgroundPositionMobile =
    sectionBackgroundPositionsMobile[activeSection] || sectionBackgroundPositionsMobile.home
  const backgroundStyle = loadedBackgrounds[activeSection]
    ? `linear-gradient(120deg, rgba(15, 12, 8, 0.86), rgba(34, 26, 15, 0.68)), url(${activeBackground})`
    : 'linear-gradient(120deg, rgba(15, 12, 8, 0.92), rgba(34, 26, 15, 0.8))'

  const feedbackLoop = [...customerFeedback, ...customerFeedback]

  return (
    <div
      className="site-shell"
      style={{
        backgroundImage: backgroundStyle,
        '--section-bg-pos': activeBackgroundPosition,
        '--section-bg-pos-mobile': activeBackgroundPositionMobile,
        backgroundColor: '#13120f',
      }}
    >
      <div className="page">
        <div className="logo-container">
          <div className="logo-box">
            <p className="logo-text">N<span className="logo-accent">V</span></p>
          </div>
          <p className="tagline">Naturally Wholesome • Premium Dryfruits</p>
        </div>

        <div className="top-row">
          <nav className={`top-tabs ${isMobileNavOpen ? 'open' : ''}`} aria-label="Primary navigation">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                className="tab-link"
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  goToSection(tab.sectionId)
                }}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="top-row-right">
            <button
              type="button"
              className={`menu-toggle ${isMobileNavOpen ? 'open' : ''}`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <header className="hero" id="home">
          <div className="overlay" />
          <div className="hero-float-layer" aria-hidden="true">
            {homeFloatingDryfruits.map((item, index) => (
              <img
                key={item.name}
                className={`floating-fruit fruit-${index + 1}`}
                src={item.image}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
          <div className="hero-inner">
            <div className="hero-content">
              <p className="eyebrow">NutriVerse · Premium Dryfruits</p>
              <h1>Fresh, Handpicked Dryfruits For Everyday Wellness</h1>
              <p className="subtitle">
                This website is informational. For availability, gifting enquiries, and purchase discussions,
                connect directly with us on WhatsApp.
              </p>
              <div className="hero-actions">
                <button className="primary" type="button" onClick={() => goToSection('products')}>
                  View Products
                </button>
              </div>
            </div>

            <aside className="hero-showcase" aria-label="NutriVerse highlights">
              <article className="hero-point">
                <h4>100% Fresh Batches</h4>
                <p>Carefully packed with moisture-controlled storage standards.</p>
              </article>
              <article className="hero-point">
                <h4>Premium Daily Nutrition</h4>
                <p>Protein-rich nuts and naturally sweet dryfruits for everyday use.</p>
              </article>
              <article className="hero-point">
                <h4>Guided By Real Team</h4>
                <p>Speak with our team on WhatsApp for current stock and recommendations.</p>
              </article>
            </aside>
          </div>
        </header>

        <section className="about-section section-gap" id="about-us">
          <div className="section-header">
            <p className="eyebrow">About Us</p>
            <h2>Rooted in Wellness, Built on Trust</h2>
          </div>
          <p className="about-copy">
            NutriVerse started with one simple promise: make everyday nutrition delicious, clean, and
            trustworthy. Every batch is selected for freshness, sorted with care, and packed to keep
            natural taste and crunch intact. We focus on quality that feels premium and service that
            feels personal.
          </p>
        </section>

        <section className="quick-highlights section-gap">
          <article>
            <h3>Farm-Fresh Sourcing</h3>
            <p>Direct partnerships with trusted growers for consistent quality.</p>
          </article>
          <article>
            <h3>Hygiene First</h3>
            <p>Carefully packed in clean, food-safe packaging every day.</p>
          </article>
          <article>
            <h3>Informative Experience</h3>
            <p>Browse product information and connect on WhatsApp for assistance.</p>
          </article>
          <article>
            <h3>Gifting Support</h3>
            <p>Guidance for festive and corporate gifting assortments.</p>
          </article>
        </section>

        <section className="section-gap" id="products">
          <div className="section-header">
            <p className="eyebrow">Products</p>
            <h2>Our Dryfruit Collection</h2>
          </div>
          <div className="product-grid">
            {products.map((item) => (
              <article className="card product-card" key={item.name}>
                <img src={item.image} alt={item.name} className="product-image" />
                <h4>{item.name}</h4>
                <p>{item.details}</p>
                <ul className="product-highlights">
                  {item.highlights.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="bulk-contact-card section-gap">
            <p>
              This website does not process online orders. For latest prices, stock availability, and
              discussion about quantities, please contact us on WhatsApp.
            </p>
            <div className="bulk-actions">
              <a className="action-link" href={`tel:${BUSINESS_INFO.primaryPhoneTel}`}>
                Call: {BUSINESS_INFO.primaryPhoneDisplay}
              </a>
              <a className="action-link whatsapp-link" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="quality section-gap" id="quality">
          <div className="section-header">
            <p className="eyebrow">Quality Assurance</p>
            <h2>Safety, Freshness, and Trust in Every Pack</h2>
          </div>
          <ul className="quality-list">
            {qualityPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="faq-section section-gap" id="faq">
          <div className="section-header">
            <p className="eyebrow">FAQ</p>
            <h2>Quick Answers Before You Contact Us</h2>
          </div>
          <div className="faq-grid">
            {faqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-gap" id="locations">
          <div className="section-header">
            <p className="eyebrow">Our Locations</p>
            <h2>Visit NutriVerse Near You</h2>
          </div>
          <div className="location-carousel-wrapper">
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={() => handleLocationScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll locations left"
            >
              ←
            </button>
            <div className="location-grid" ref={locationScrollContainerRef}>
              {stores.map((shop) => (
                <article className="card" key={shop.branch}>
                  <h4>{shop.branch}</h4>
                  <p>{shop.address}</p>
                  <p><strong>Store Contact:</strong> {shop.phone}</p>
                  <span className="meta">Hours: {shop.hours}</span>
                </article>
              ))}
            </div>
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={() => handleLocationScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll locations right"
            >
              →
            </button>
          </div>
        </section>

        <section className="contact section-gap" id="contact-us">
          <div className="section-header">
            <p className="eyebrow">Contact</p>
            <h2>Get In Touch</h2>
          </div>
          <div className="contact-card">
            <p><strong>Phone:</strong> {BUSINESS_INFO.primaryPhoneDisplay}</p>
            <p><strong>Email:</strong> {BUSINESS_INFO.email}</p>
            <p><strong>Main Store:</strong> {BUSINESS_INFO.mainStoreAddress}</p>
            <p><strong>WhatsApp:</strong> Available from {BUSINESS_INFO.whatsappHours}</p>
            <div className="bulk-actions">
              <a className="action-link whatsapp-link" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer section-gap">
          <section className="feedback-block">
            <div className="section-header">
              <p className="eyebrow">Customer Feedback</p>
              <h2>What Customers Appreciate</h2>
            </div>
            <div className="feedback-slider-container">
              <div className="feedback-slider-viewport" aria-label="Customer feedback carousel">
                <div className="feedback-slider-track">
                  {feedbackLoop.map((item, index) => (
                    <article className="card feedback-card" key={`${item.name}-${index}`}>
                      <h4>{item.product}</h4>
                      <p className="customer-name">— {item.name}</p>
                      <p className="stars">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</p>
                      <p className="feedback-note">{item.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="service-block">
            <div className="section-header">
              <p className="eyebrow">Why Choose NutriVerse</p>
              <h2>Our Service Promise</h2>
            </div>
            <div className="service-grid">
              {serviceHighlights.map((item) => (
                <article className="service-card" key={item.title}>
                  <span className="service-icon">{item.icon}</span>
                  <h4>{item.title}</h4>
                </article>
              ))}
            </div>
          </section>
        </footer>

        <div className="copyright-section">
          <p>&copy; 2026 NutriVerse. All rights reserved.</p>
          <div className="footer-links">
            <a href={LEGAL_LINKS.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span className="divider">•</span>
            <a href={LEGAL_LINKS.terms} target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
            <span className="divider">•</span>
            <a href={LEGAL_LINKS.websiteInfo} target="_blank" rel="noopener noreferrer">Website Info Only</a>
          </div>
        </div>
      </div>

      <a
        className="floating-whatsapp"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NutriVerse on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-3h-8V9h8v2zm0-3H6V6h12v2z" />
        </svg>
      </a>
    </div>
  )
}

export default App

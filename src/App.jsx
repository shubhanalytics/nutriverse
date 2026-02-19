import { useState } from 'react'
import './index.css'

function App() {
  const preventNavigation = (event) => {
    event.preventDefault()
  }

  const tabs = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Us', sectionId: 'about-us' },
    { label: 'Shop', sectionId: 'products' },
    { label: 'Bulk Order', sectionId: 'bulk-order' },
    { label: 'Locations', sectionId: 'locations' },
    { label: 'Contact Us', sectionId: 'contact-us' },
  ]

  const sectionBackgrounds = {
    home: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=80',
    'about-us': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1800&q=80',
    products: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1800&q=80',
    'bulk-order': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1800&q=80',
    locations: 'https://images.unsplash.com/photo-1532635223-478243a4f9c2?auto=format&fit=crop&w=1800&q=80',
    'contact-us': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80',
  }

  const [activeSection, setActiveSection] = useState('home')

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5H8c-2.8 0-5-2.2-5-5V8c0-2.8 2.2-5 5-5Zm0 2C6.3 5 5 6.3 5 8v8c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3V8c0-1.7-1.3-3-3-3H8Zm9.3 1.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.9 3H22l-6.8 7.8L23 21h-6.1l-4.8-6.3L6.6 21H3.5l7.2-8.3L1 3h6.3l4.3 5.7L18.9 3Zm-1.1 16h1.7L6.4 4.9H4.6L17.8 19Z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.1v8h3.4Z" />
        </svg>
      ),
    },
  ]

  const goToSection = (sectionId) => {
    setActiveSection(sectionId)

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

  const products = [
    {
      name: 'California Almonds',
      details: 'Protein-rich crunchy almonds for daily snacking and breakfast.',
      pricing: {
        '250g': '₹260',
        '500g': '₹500',
        '1kg': '₹960',
        bulk: '₹900/kg (Bulk Quote)',
      },
    },
    {
      name: 'Premium Cashews',
      details: 'W240 and W320 grade handpicked whole cashews.',
      pricing: {
        '250g': '₹320',
        '500g': '₹620',
        '1kg': '₹1200',
        bulk: '₹1120/kg (Bulk Quote)',
      },
    },
    {
      name: 'Roasted Pistachios',
      details: 'Salted premium pistachios with natural flavor and crunch.',
      pricing: {
        '250g': '₹380',
        '500g': '₹740',
        '1kg': '₹1420',
        bulk: '₹1340/kg (Bulk Quote)',
      },
    },
    {
      name: 'Walnut Kernels',
      details: 'Omega-rich walnut halves ideal for smoothies and salads.',
      pricing: {
        '250g': '₹290',
        '500g': '₹560',
        '1kg': '₹1080',
        bulk: '₹1020/kg (Bulk Quote)',
      },
    },
    {
      name: 'Afghan Raisins',
      details: 'Naturally sweet seedless raisins for desserts and snacking.',
      pricing: {
        '250g': '₹180',
        '500g': '₹340',
        '1kg': '₹650',
        bulk: '₹590/kg (Bulk Quote)',
      },
    },
    {
      name: 'Royal Dryfruit Mix',
      details: 'Balanced premium blend of almonds, cashews, pistachios, and raisins.',
      pricing: {
        '250g': '₹340',
        '500g': '₹660',
        '1kg': '₹1280',
        bulk: '₹1180/kg (Bulk Quote)',
      },
    },
  ]

  const quantityOptions = ['250g', '500g', '1kg', 'bulk']
  const [selectedQuantities, setSelectedQuantities] = useState(() => (
    Object.fromEntries(products.map((product) => [product.name, '250g']))
  ))

  const qualityPoints = [
    'Sourced from verified farms and import partners',
    'Batch-wise freshness checks and moisture control',
    'Food-grade packaging with daily handling hygiene',
    'No stale stock policy with regular rotation',
  ]

  const stores = [
    {
      branch: 'NutriVerse Central Market',
      address: 'Shop 14, Central Market Road, Main City',
      hours: '10:00 AM – 9:30 PM',
      phone: '+91 98XX-111-321',
    },
    {
      branch: 'NutriVerse Riverside',
      address: 'Unit 7, Riverside Plaza, West Avenue',
      hours: '9:30 AM – 9:00 PM',
      phone: '+91 98XX-222-654',
    },
    {
      branch: 'NutriVerse Green Park',
      address: 'Kiosk 3, Green Park Mall, South District',
      hours: '11:00 AM – 10:00 PM',
      phone: '+91 98XX-333-987',
    },
  ]

  const updateQuantity = (productName, quantity) => {
    setSelectedQuantities((current) => ({
      ...current,
      [productName]: quantity,
    }))
  }

  const customerFeedback = [
    {
      category: 'California Almonds',
      rating: 5,
      note: 'Super fresh and crunchy. Best quality I have ordered this season.',
    },
    {
      category: 'Premium Cashews',
      rating: 5,
      note: 'Uniform size and rich taste. Packaging was clean and premium.',
    },
    {
      category: 'Bulk Order Service',
      rating: 4,
      note: 'Quick coordination and on-time dispatch for our office gifting.',
    },
    {
      category: 'Overall Store Experience',
      rating: 5,
      note: 'Helpful staff, fair pricing, and excellent product consistency.',
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
      title: 'Swift Shipping',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h11v8h2.3l2.7 2.7V20h-1.2a3 3 0 1 1-6 0H9.2a3 3 0 1 1-6 0H2V7c0-.6.4-1 1-1Zm12.5 2v4H20l-2-4h-2.5ZM6.2 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm8.6 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
        </svg>
      ),
    },
    {
      title: 'Easy Return',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4a8 8 0 0 1 7.8 6H22l-3.3 3.3L15.4 10h2.4A6 6 0 1 0 12 18a6 6 0 0 0 4.7-2.3l1.6 1.2A8 8 0 1 1 12 4Z" />
        </svg>
      ),
    },
    {
      title: '24/7 Support',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 0 1 9 9v4a3 3 0 0 1-3 3h-2v-7h3a7 7 0 1 0-14 0h3v8a3 3 0 0 0 3 3h2v-2h-2a1 1 0 0 1-1-1v-1H6a3 3 0 0 1-3-3v-4a9 9 0 0 1 9-9Z" />
        </svg>
      ),
    },
  ]

  return (
    <div
      className="site-shell"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(15, 12, 8, 0.86), rgba(34, 26, 15, 0.68)), url(${sectionBackgrounds[activeSection]})`,
      }}
    >
      <div className="page">
        <div className="top-row">
          <nav className="top-tabs" aria-label="Primary navigation">
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

          <div className="social-bar" aria-label="Social links">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                className="social-link"
                href={item.href}
                onClick={preventNavigation}
                aria-label={item.name}
                title={item.name}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <header className="hero" id="home">
          <div className="overlay" />
          <div className="hero-content">
            <p className="eyebrow">NutriVerse · Premium Dryfruits</p>
            <h1>Fresh, Handpicked Dryfruits For Everyday Wellness</h1>
            <p className="subtitle">
              Visit NutriVerse for premium almonds, pistachios, cashews, walnuts,
              raisins, and custom gift boxes.
            </p>
            <div className="hero-actions">
              <button
                className="primary"
                type="button"
                onClick={() => goToSection('products')}
              >
                Explore Collections
              </button>
              <button
                className="secondary"
                type="button"
                onClick={() => goToSection('locations')}
              >
                Visit Store
              </button>
            </div>
          </div>
        </header>

        <section className="about-section section-gap" id="about-us">
          <div className="section-header">
            <p className="eyebrow">About Us</p>
            <h2>Rooted in Wellness, Built on Trust</h2>
          </div>
          <p className="about-copy">
            NutriVerse started with one simple promise: make everyday nutrition delicious,
            clean, and trustworthy. From handpicked almonds to premium dryfruit blends,
            every batch is selected for freshness, sorted with care, and packed to keep
            natural taste and crunch intact. Whether you are buying for your home,
            gifting to loved ones, or ordering for your team, we focus on quality that
            feels premium and service that feels personal.
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
          <h3>Value Ranges</h3>
          <p>Daily snacking packs, family packs, and premium gift options.</p>
        </article>
        </section>

        <section className="section-gap" id="products">
        <div className="section-header">
          <p className="eyebrow">Shop</p>
          <h2>What We Offer</h2>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <article className="card" key={item.name}>
              <h4>{item.name}</h4>
              <p>{item.details}</p>
              <div className="shop-controls">
                <label
                  className="quantity-label"
                  htmlFor={`qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Select Quantity
                </label>
                <select
                  id={`qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="quantity-select"
                  value={selectedQuantities[item.name]}
                  onChange={(event) => updateQuantity(item.name, event.target.value)}
                >
                  {quantityOptions.map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity === 'bulk' ? 'Bulk Order' : quantity}
                    </option>
                  ))}
                </select>
              </div>
              <p className="shop-price">Price: {item.pricing[selectedQuantities[item.name]]}</p>
            </article>
          ))}
        </div>
        </section>

        <section className="quality section-gap">
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

        <section className="section-gap" id="bulk-order">
        <div className="section-header">
          <p className="eyebrow">Bulk Order</p>
          <h2>Contact Us Directly for Bulk Requirements</h2>
        </div>
        <div className="bulk-contact-card">
          <p>
            For corporate gifting, wholesale demand, or regular supply contracts,
            connect with our bulk team for custom pricing and priority dispatch.
          </p>
          <div className="bulk-actions">
            <a className="action-link" href="tel:+9198XXXX4321">Call: +91 98XX-XX-4321</a>
            <a
              className="action-link whatsapp-link"
              href="#"
              onClick={preventNavigation}
              aria-label="WhatsApp bulk order"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11.8c0 4.7-3.8 8.5-8.5 8.5-1.5 0-2.9-.4-4.1-1.1L3 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.5Zm-8.5-7a7 7 0 0 0-6.1 10.5l.3.5-.8 2.4 2.5-.8.5.3a7 7 0 1 0 3.6-13Zm3.9 8.9c-.2-.1-1.1-.6-1.2-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.9-.1.1-.2.2-.4.1-.9-.4-1.6-.9-2.2-1.8-.2-.3.2-.3.6-1.1.1-.1 0-.3 0-.4 0-.1-.4-1-.6-1.4-.2-.3-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.5 4 3.4 1.5.6 2.1.7 2.8.6.4-.1 1.1-.5 1.3-1 .2-.6.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z" />
              </svg>
              Message on WhatsApp (Dummy)
            </a>
          </div>
        </div>
        </section>

        <section className="section-gap" id="locations">
        <div className="section-header">
          <p className="eyebrow">Our Locations</p>
          <h2>Visit NutriVerse Near You</h2>
        </div>
        <div className="location-grid">
          {stores.map((shop) => (
            <article className="card" key={shop.branch}>
              <h4>{shop.branch}</h4>
              <p>{shop.address}</p>
              <p><strong>Store Contact:</strong> {shop.phone}</p>
              <span className="meta">Hours: {shop.hours}</span>
            </article>
          ))}
        </div>
        </section>

        <section className="contact section-gap" id="contact-us">
        <div className="section-header">
          <p className="eyebrow">Contact Info</p>
          <h2>Get in Touch with NutriVerse</h2>
        </div>
        <div className="contact-card">
          <p><strong>Phone:</strong> +91 98XX-XXX-321</p>
          <p><strong>Email:</strong> hello@nutriverse.in</p>
          <p><strong>Main Store:</strong> Shop 14, Central Market Road, Main City</p>
          <p><strong>WhatsApp Orders:</strong> Available from 10:00 AM – 8:00 PM</p>
        </div>
        </section>

        <footer className="site-footer section-gap">
          <section className="feedback-block">
            <div className="section-header">
              <p className="eyebrow">Customer Feedback</p>
              <h2>Positive Ratings Across Products and Services</h2>
            </div>
            <div className="feedback-grid">
              {customerFeedback.map((item) => (
                <article className="card" key={item.category}>
                  <h4>{item.category}</h4>
                  <p className="stars">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</p>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="service-block">
            <div className="section-header">
              <p className="eyebrow">Why Choose NutriVerse</p>
              <h2>Premium Service Promise</h2>
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
      </div>
    </div>
  )
}

export default App

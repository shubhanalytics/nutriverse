import './index.css'

function App() {
  const goToSection = (sectionId) => {
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
      size: '250g · 500g · 1kg',
    },
    {
      name: 'Premium Cashews',
      details: 'W240 and W320 grade handpicked whole cashews.',
      size: '250g · 500g · 1kg',
    },
    {
      name: 'Roasted Pistachios',
      details: 'Salted premium pistachios with natural flavor and crunch.',
      size: '200g · 400g · 800g',
    },
    {
      name: 'Walnut Kernels',
      details: 'Omega-rich walnut halves ideal for smoothies and salads.',
      size: '250g · 500g · 1kg',
    },
  ]

  const qualityPoints = [
    'Sourced from verified farms and import partners',
    'Batch-wise freshness checks and moisture control',
    'Food-grade packaging with daily handling hygiene',
    'No stale stock policy with regular rotation',
  ]

  const priceRanges = [
    { type: 'Daily Essentials', price: '₹180 – ₹380', note: 'Pocket packs for regular use' },
    { type: 'Family Saver Packs', price: '₹400 – ₹900', note: 'Best value for households' },
    { type: 'Premium Selection', price: '₹950 – ₹2200', note: 'Imported and gift-grade dryfruits' },
    { type: 'Festive Gift Boxes', price: '₹1200 – ₹4500', note: 'Elegant corporate and festive gifting' },
  ]

  const stores = [
    {
      branch: 'NutriVerse Central Market',
      address: 'Shop 14, Central Market Road, Main City',
      hours: '10:00 AM – 9:30 PM',
    },
    {
      branch: 'NutriVerse Riverside',
      address: 'Unit 7, Riverside Plaza, West Avenue',
      hours: '9:30 AM – 9:00 PM',
    },
    {
      branch: 'NutriVerse Green Park',
      address: 'Kiosk 3, Green Park Mall, South District',
      hours: '11:00 AM – 10:00 PM',
    },
  ]

  return (
    <div className="page">
      <header className="hero">
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
          <p className="eyebrow">What We Sell</p>
          <h2>Our Top Dryfruit Categories</h2>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <article className="card" key={item.name}>
              <h4>{item.name}</h4>
              <p>{item.details}</p>
              <span className="meta">Available Packs: {item.size}</span>
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

      <section className="section-gap">
        <div className="section-header">
          <p className="eyebrow">Price Ranges</p>
          <h2>Transparent Pricing for Every Need</h2>
        </div>
        <div className="pricing-grid">
          {priceRanges.map((range) => (
            <article className="card" key={range.type}>
              <h4>{range.type}</h4>
              <p className="price">{range.price}</p>
              <p>{range.note}</p>
            </article>
          ))}
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
              <span className="meta">Hours: {shop.hours}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-gap">
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

      <footer className="step-note">Step 2: Full landing page content structure</footer>
    </div>
  )
}

export default App

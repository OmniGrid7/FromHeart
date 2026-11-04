import { useEffect, useState } from 'react'
import siteContent from './data/siteContent.json'

const giftIdeaGroups = siteContent.giftIdeaGroups
const giftIdeaItems = giftIdeaGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title }))
)

const giftingCategories = [
  {
    title: 'Welcome Kits',
    description: 'Thoughtful onboarding gifting for new hires, clients and partners with premium packaging and tailored choices.',
    icon: '🎁'
  },
  {
    title: 'Custom Branding',
    description: 'Logo engraving, printing, embossing and packaging that makes every gift feel premium and personal.',
    icon: '✦'
  },
  {
    title: 'Corporate Events',
    description: 'Memorable giveaways and curated merchandise for launches, conferences, festivals and milestones.',
    icon: '📦'
  },
  {
    title: 'Executive Gifts',
    description: 'High-impact, practical gifting for leadership moments, stakeholder appreciation and year-end celebrations.',
    icon: '💼'
  }
]

const features = [
  'Fully customised with your brand identity',
  'Premium packaging included for every order',
  'Mix and match options across budgets',
  'Pan-India delivery with quick fulfilment'
]

const gallery = [
  { label: 'Premium kits', tone: 'warm' },
  { label: 'Brand-ready sets', tone: 'cool' },
  { label: 'Executive gifting', tone: 'warm-alt' }
]

function HeartLogo() {
  return (
    <div className="heart-logo" aria-label="FromHeart logo">
      <svg viewBox="0 0 320 240" role="img" aria-hidden="true">
        <path d="M160 196C119 164 86 136 64 103C50 82 46 52 66 36C93 16 125 31 151 59C171 34 204 18 232 36C253 49 255 80 243 102C218 138 184 164 160 196Z" />
      </svg>
    </div>
  )
}

function GiftIdeaPage({ item }) {
  return (
    <section className="gift-page">
      <div className="gift-breadcrumb">
        <a href="#home">Home</a>
        <span aria-hidden="true">/</span>
        <span>Gift Ideas</span>
        <span aria-hidden="true">/</span>
        <span>{item.title}</span>
      </div>

      <div className="gift-page-hero">
        <p className="eyebrow">{item.group}</p>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <a className="primary-btn" href="#contact">Enquire about {item.title}</a>
      </div>

      <div className="gift-page-content">
        <div className="section-heading">
          <p className="eyebrow">Explore the collection</p>
          <h2>Ideas to make it yours.</h2>
          <p className="gift-page-intro">
            Choose a style to get started. We can tailor the product, colours, branding and packaging to your occasion and budget.
          </p>
        </div>
        <div className="gift-ideas-grid">
          {item.ideas.map((idea, index) => (
            <article className="gift-idea-card" key={idea}>
              <span className="gift-idea-number">0{index + 1}</span>
              <div className="gift-idea-art" aria-hidden="true">
                <span>{item.title.charAt(0)}</span>
              </div>
              <h3>{idea}</h3>
              <p>Customisable with your logo and presented to suit your brand.</p>
              <a href="#contact">Ask us about this <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>

      <div className="gift-page-cta">
        <div>
          <p className="eyebrow">A thoughtful gift starts here</p>
          <h2>Need help choosing?</h2>
          <p>Tell us the occasion, quantity and budget. We’ll curate options for you.</p>
        </div>
        <a className="primary-btn" href="#contact">Request a custom quote</a>
      </div>
    </section>
  )
}

function App() {
  const [giftSlug, setGiftSlug] = useState(() => {
    const match = window.location.hash.match(/^#\/gift\/([^/?#]+)/)
    return match ? decodeURIComponent(match[1]) : null
  })

  useEffect(() => {
    const syncRoute = () => {
      const match = window.location.hash.match(/^#\/gift\/([^/?#]+)/)
      setGiftSlug(match ? decodeURIComponent(match[1]) : null)
    }

    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const currentGift = giftIdeaItems.find((item) => item.slug === giftSlug)

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <HeartLogo />
          <div className="brand-text">FromHeart</div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <details className="nav-dropdown">
            <summary>Gift Ideas <span aria-hidden="true">⌄</span></summary>
            <div className="mega-menu">
              <div className="mega-menu-inner">
                {giftIdeaGroups.map((group) => (
                  <div className="mega-menu-column" key={group.title}>
                    <h3>{group.title}</h3>
                    {group.items.map((item) => (
                      <a
                        href={`#/gift/${item.slug}`}
                        key={item.slug}
                        onClick={(event) => {
                          const menu = event.currentTarget.closest('details')
                          if (menu) menu.open = false
                        }}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </details>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
        </nav>

        <a className="cta-button" href="#contact">Request a Quote</a>
      </header>

      <main>
        {giftSlug ? (
          currentGift ? (
            <GiftIdeaPage item={currentGift} />
          ) : (
            <section className="gift-page not-found">
              <p className="eyebrow">Gift ideas</p>
              <h1>We couldn’t find that collection.</h1>
              <a className="primary-btn" href="#home">Back to home</a>
            </section>
          )
        ) : (
          <>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Thoughtful gifting, beautifully branded</p>
            <h1>Gifts that build stronger relationships.</h1>
            <p className="subtext">
              From corporate welcome kits to premium client appreciation gifting, we design memorable experiences that reflect your brand with warmth and care.
            </p>

            <div className="hero-actions">
              <button className="primary-btn">Get a Custom Catalogue</button>
              <button className="secondary-btn">View Gift Ideas</button>
            </div>

            <div className="stats-row" aria-label="Business metrics">
              <div>
                <strong>500+</strong>
                <span>Happy clients</span>
              </div>
              <div>
                <strong>10K+</strong>
                <span>Orders delivered</span>
              </div>
              <div>
                <strong>7–10</strong>
                <span>Days turnaround</span>
              </div>
            </div>
          </div>

          <div className="showcase-panel" aria-label="Featured gifting packages">
            <div className="product-card featured">
              <span className="product-tag">Best Seller</span>
              <h3>Executive Welcome Box</h3>
              <ul>
                <li>Premium notebook</li>
                <li>Branded tumbler</li>
                <li>Custom packaging</li>
              </ul>
              <div className="card-price">From ₹1,999</div>
            </div>
          </div>
        </section>

        <section className="services" id="solutions">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>Corporate gifting, end to end.</h2>
          </div>

          <div className="cards-grid">
            {giftingCategories.map((item) => (
              <article className="info-card" key={item.title}>
                <div className="icon-wrap">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-band" id="about">
          <div className="feature-copy">
            <p className="eyebrow">Our specialty</p>
            <h2>Welcome kits that create lasting impressions.</h2>
            <p>
              We bring together premium products, thoughtful designing and customised branding to help your company leave a warm, memorable first impression.
            </p>
            <ul>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="feature-visual" aria-label="Gift box showcase">
            <div className="visual-box">
              <div className="box-line line-a"></div>
              <div className="box-line line-b"></div>
              <div className="box-line line-c"></div>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="process">
          <div className="section-heading narrow">
            <p className="eyebrow">How it works</p>
            <h2>From enquiry to doorstep in 4 steps.</h2>
          </div>

          <div className="steps-grid">
            <div className="step-item"><span>01</span><h3>Share Your Brief</h3><p>Tell us your quantity, budget and occasion.</p></div>
            <div className="step-item"><span>02</span><h3>Get a Catalogue</h3><p>Receive curated selections in just a few hours.</p></div>
            <div className="step-item"><span>03</span><h3>Approve Mockup</h3><p>Review branding before production begins.</p></div>
            <div className="step-item"><span>04</span><h3>We Deliver</h3><p>Custom packed items shipped across India on time.</p></div>
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-heading">
            <p className="eyebrow">Our work</p>
            <h2>A glimpse of what we deliver.</h2>
          </div>

          <div className="portfolio-grid">
            {gallery.map((item, index) => (
              <div className={`portfolio-card ${item.tone}`} key={item.label}>
                <div className="portfolio-shape">
                  <div className="mini-box"></div>
                  <div className="mini-box"></div>
                  <div className="mini-box"></div>
                  <span>{index + 1}</span>
                </div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="footer" id="contact">
        <div className="footer-banner">
          <div>
            <p className="eyebrow">Ready to gift smarter?</p>
            <h2>Tell us what you need. We’ll help make it memorable.</h2>
            <p className="footer-intro">
              Share your quantity, budget and occasion. Our team will help you find the right gifts and prepare a custom quote.
            </p>
          </div>
          <a className="primary-btn" href="#contact">Get a Custom Quote</a>
        </div>
        <div className="footer-links">
          <div className="footer-brand">
            <div className="footer-brand-name">FromHeart</div>
            <p>Thoughtful gifts, made personal.</p>
          </div>
          <div className="footer-link-group">
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#solutions">Gift ideas</a>
            <a href="#about">About us</a>
          </div>
          <div className="footer-link-group">
            <h3>Gifting</h3>
            <a href="#solutions">Welcome kits</a>
            <a href="#solutions">Corporate gifts</a>
            <a href="#solutions">Custom branding</a>
          </div>
          <div className="footer-link-group">
            <h3>Get in touch</h3>
            <a href="#contact">Contact us</a>
            <a href="#contact">Request a quote</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FromHeart. All rights reserved.</span>
          <span>Made with care, from heart to hand.</span>
        </div>
      </footer>
    </div>
  )
}

export default App

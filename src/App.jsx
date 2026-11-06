import { useEffect, useState } from 'react'
import siteContent from './data/siteContent.json'

const giftIdeaGroups = siteContent.giftIdeaGroups
const giftIdeaItems = giftIdeaGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title }))
)

const giftingCategories = siteContent.giftingCategories
const featuredGift = siteContent.featuredGift
const features = siteContent.features
const gallery = siteContent.gallery
const whatsappUrl = (message) =>
  `https://wa.me/${siteContent.whatsappNumber}?text=${encodeURIComponent(message)}`
const productMessage = (item, request) => {
  const details = item.details?.map((detail) => `• ${detail}`).join('\n')

  return [
    `Hello FromHeart! I'd like to ${request} ${item.title}.`,
    item.description,
    details && `Product details:\n${details}`,
    item.price && `Price: ${item.price}`,
    'Please share availability and help me with the next steps.',
  ].filter(Boolean).join('\n\n')
}

function ProductWhatsAppLink({ item, request, className, children }) {
  return (
    <a
      className={className}
      href={whatsappUrl(productMessage(item, request))}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const giftCollections = [
  {
    ...featuredGift,
    image: featuredGift.image,
    eyebrow: 'Welcome gifts',
    details: featuredGift.items,
  },
  {
    ...siteContent.welcomeKitImage,
    image: siteContent.welcomeKitImage.src,
    label: siteContent.welcomeKitImage.title,
    eyebrow: 'Thoughtful onboarding',
  },
  ...gallery.map((item) => ({
    ...item,
    title: item.label,
    eyebrow: 'From our collection',
  })),
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
        <a
          className="primary-btn"
          href={whatsappUrl(`Hello FromHeart! I'm interested in ${item.title}. Please share the available options and pricing.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire about {item.title}
        </a>
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
              <a
                href={whatsappUrl(`Hello FromHeart! I'd like to know more about ${idea} for ${item.title}. Please share the options and pricing.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask us about this <span aria-hidden="true">→</span>
              </a>
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
        <a
          className="primary-btn"
          href={whatsappUrl(`Hello FromHeart! I'd like a custom quote for ${item.title}. Please help me choose options for my quantity, budget, and occasion.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a custom quote
        </a>
      </div>
    </section>
  )
}

function GiftCollectionPage({ item }) {
  return (
    <section className="gift-page collection-page">
      <div className="gift-breadcrumb">
        <a href="#home">Home</a>
        <span aria-hidden="true">/</span>
        <a href="#process">Our work</a>
        <span aria-hidden="true">/</span>
        <span>{item.title}</span>
      </div>

      <div className="collection-hero">
        <div className="collection-image-wrap">
          <img src={item.image} alt={item.alt} />
        </div>
        <div className="collection-copy">
          <p className="eyebrow">{item.eyebrow}</p>
          <h1>{item.title}</h1>
          <p className="collection-description">{item.description}</p>
          {item.price && <p className="collection-price">{item.price}</p>}
          <ProductWhatsAppLink className="primary-btn" item={item} request="learn more about">
            Enquire about {item.title}
          </ProductWhatsAppLink>
        </div>
      </div>

      <div className="gift-page-content collection-details">
        <div className="section-heading">
          <p className="eyebrow">The details</p>
          <h2>Thoughtful from the first look.</h2>
          <p className="gift-page-intro">{item.description}</p>
        </div>
        <ul className="collection-detail-list">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="collection-note">
          <h3>Made to feel like your brand</h3>
          <p>
            Choose the products, colours, branding and packaging that suit your occasion and budget.
            Share your quantity and timeline, and we’ll help curate the right set.
          </p>
        </div>
      </div>

      <div className="gift-page-cta">
        <div>
          <p className="eyebrow">Make it yours</p>
          <h2>Looking for a custom set?</h2>
          <p>Tell us what you have in mind and we’ll prepare options for your brief.</p>
        </div>
        <ProductWhatsAppLink className="primary-btn" item={item} request="get a custom quote for">
          Request a custom quote
        </ProductWhatsAppLink>
      </div>
    </section>
  )
}

function ServicePage({ service }) {
  return (
    <section className="gift-page service-page">
      <div className="gift-breadcrumb">
        <a href="#home">Home</a>
        <span aria-hidden="true">/</span>
        <a href="#solutions">What we do</a>
        <span aria-hidden="true">/</span>
        <span>{service.title}</span>
      </div>

      <div className="gift-page-hero">
        <p className="eyebrow">FromHeart services</p>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <a
          className="primary-btn"
          href={whatsappUrl(`Hello FromHeart! I'd like to plan ${service.title.toLowerCase()}. Please share suitable gifting options and pricing.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Plan {service.title.toLowerCase()}
        </a>
      </div>

      <div className="gift-page-content">
        <div className="section-heading">
          <p className="eyebrow">Made for your occasion</p>
          <h2>Thoughtful details, made yours.</h2>
          <p className="gift-page-intro">
            Choose a starting point and we’ll tailor the products, branding and presentation to fit your brief.
          </p>
        </div>
        <div className="service-offerings">
          {service.offerings.map((offering, index) => (
            <article className="service-offering reveal" key={offering}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{offering}</h3>
              <p>Personalised to your brand, audience and budget.</p>
            </article>
          ))}
        </div>
      </div>

      <div className="gift-page-cta">
        <div>
          <p className="eyebrow">Let’s make it memorable</p>
          <h2>Have an occasion in mind?</h2>
          <p>Share your quantity, timeline and budget. We’ll help put together the right gifts.</p>
        </div>
        <a
          className="primary-btn"
          href={whatsappUrl(`Hello FromHeart! I'd like a custom quote for ${service.title}. Please help me with options for my quantity, budget, and timeline.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a custom quote
        </a>
      </div>
    </section>
  )
}

function App() {
  const [giftSlug, setGiftSlug] = useState(() => {
    const match = window.location.hash.match(/^#\/gift\/([^/?#]+)/)
    return match ? decodeURIComponent(match[1]) : null
  })
  const [serviceSlug, setServiceSlug] = useState(() => {
    const match = window.location.hash.match(/^#\/service\/([^/?#]+)/)
    return match ? decodeURIComponent(match[1]) : null
  })
  const [collectionSlug, setCollectionSlug] = useState(() => {
    const match = window.location.hash.match(/^#\/collection\/([^/?#]+)/)
    return match ? decodeURIComponent(match[1]) : null
  })

  useEffect(() => {
    const syncRoute = () => {
      const giftMatch = window.location.hash.match(/^#\/gift\/([^/?#]+)/)
      const serviceMatch = window.location.hash.match(/^#\/service\/([^/?#]+)/)
      const collectionMatch = window.location.hash.match(/^#\/collection\/([^/?#]+)/)
      setGiftSlug(giftMatch ? decodeURIComponent(giftMatch[1]) : null)
      setServiceSlug(serviceMatch ? decodeURIComponent(serviceMatch[1]) : null)
      setCollectionSlug(collectionMatch ? decodeURIComponent(collectionMatch[1]) : null)
      if (giftMatch || serviceMatch || collectionMatch) window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((element, index) => {
      element.style.transitionDelay = `${(index % 4) * 70}ms`
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [giftSlug, serviceSlug, collectionSlug])

  useEffect(() => {
    const container = document.getElementById('sparkles')
    if (!container) return
    let timer
    function createSparkle() {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      const size = Math.random() * 6 + 4
      sparkle.style.width = `${size}px`
      sparkle.style.height = `${size}px`
      sparkle.style.left = `${Math.random() * 100}%`
      sparkle.style.bottom = '0px'
      const duration = Math.random() * 2 + 2
      sparkle.style.animationDuration = `${duration}s`
      container.appendChild(sparkle)
      timer = setTimeout(() => sparkle.remove(), duration * 1000)
    }
    const interval = setInterval(createSparkle, 300)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const currentGift = giftIdeaItems.find((item) => item.slug === giftSlug)
  const currentService = giftingCategories.find((item) => item.slug === serviceSlug)
  const currentCollection = giftCollections.find((item) => item.slug === collectionSlug)

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

        {currentCollection ? (
          <ProductWhatsAppLink className="cta-button" item={currentCollection} request="get a quote for">
            Request a Quote
          </ProductWhatsAppLink>
        ) : (
          <a
            className="cta-button"
            href={whatsappUrl("Hello FromHeart! I'd like a quote for corporate gifting. Please help me with the available options.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a Quote
          </a>
        )}
      </header>

      <main>
        {serviceSlug ? (
          currentService ? (
            <ServicePage service={currentService} />
          ) : (
            <section className="gift-page not-found">
              <p className="eyebrow">What we do</p>
              <h1>We couldn’t find that service.</h1>
              <a className="primary-btn" href="#home">Back to home</a>
            </section>
          )
        ) : giftSlug ? (
          currentGift ? (
            <GiftIdeaPage item={currentGift} />
          ) : (
            <section className="gift-page not-found">
              <p className="eyebrow">Gift ideas</p>
              <h1>We couldn’t find that collection.</h1>
              <a className="primary-btn" href="#home">Back to home</a>
            </section>
          )
        ) : collectionSlug ? (
          currentCollection ? (
            <GiftCollectionPage item={currentCollection} />
          ) : (
            <section className="gift-page not-found">
              <p className="eyebrow">Our work</p>
              <h1>We couldn’t find that gift.</h1>
              <a className="primary-btn" href="#home">Back to home</a>
            </section>
          )
        ) : (
          <>
        <section className="hero" id="home">
          <div className="hero-fireworks" aria-hidden="true">
            {['firework-left', 'firework-right'].map((burst) => (
              <span className={`firework-burst ${burst}`} key={burst}>
                {Array.from({ length: 8 }, (_, index) => (
                  <i key={index} style={{ '--angle': `${index * 45}deg`, '--delay': `${index * -0.12}s` }} />
                ))}
              </span>
            ))}
          </div>
          <div className="hero-lights" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <i key={index} style={{ '--delay': `${index * -0.3}s` }} />
            ))}
          </div>
          <span className="floating-lantern lantern-one" aria-hidden="true" />
          <span className="floating-lantern lantern-two" aria-hidden="true" />
          <span className="floating-lantern lantern-three" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-tagline">
              <span className="tagline-spark tagline-spark-left" aria-hidden="true">✦</span>
              <span>thoughtful gifting, beautifully branded</span>
              <span className="tagline-spark tagline-spark-right" aria-hidden="true">✦</span>
            </p>
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

          <div className="showcase-panel reveal" aria-label="Featured gifting packages">
            <a className="product-card featured" href={`#/collection/${featuredGift.slug}`} aria-label={`View ${featuredGift.title} details`}>
              <span className="product-tag">{featuredGift.tag}</span>
              <img className="featured-gift-image" src={featuredGift.image} alt={featuredGift.alt} />
              <h3>{featuredGift.title}</h3>
              <ul>
                {featuredGift.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="card-price">{featuredGift.price}</div>
              <span className="product-card-link">View gift details <span aria-hidden="true">→</span></span>
            </a>
          </div>

          <div className="sparkles-container" id="sparkles" />
        </section>

        <section className="services" id="solutions">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>Corporate gifting, end to end.</h2>
          </div>

          <div className="cards-grid">
            {giftingCategories.map((item) => (
              <a className="info-card reveal" href={`#/service/${item.slug}`} key={item.slug}>
                <div className="icon-wrap">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="info-card-link">Explore {item.title} <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className="feature-band" id="about">
          <div className="feature-copy reveal">
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

          <a
            className="feature-visual gift-image-link reveal"
            href={`#/collection/${siteContent.welcomeKitImage.slug}`}
            aria-label={`View ${siteContent.welcomeKitImage.title} details`}
          >
            <div className="visual-box">
              <img src={siteContent.welcomeKitImage.src} alt={siteContent.welcomeKitImage.alt} loading="lazy" />
            </div>
          </a>
        </section>

        <section className="gallery-section" id="process">
          <div className="section-heading narrow">
            <p className="eyebrow">How it works</p>
            <h2>From enquiry to doorstep in 4 steps.</h2>
          </div>

          <div className="steps-grid">
            <div className="step-item reveal"><span>01</span><h3>Share Your Brief</h3><p>Tell us your quantity, budget and occasion.</p></div>
            <div className="step-item reveal"><span>02</span><h3>Get a Catalogue</h3><p>Receive curated selections in just a few hours.</p></div>
            <div className="step-item reveal"><span>03</span><h3>Approve Mockup</h3><p>Review branding before production begins.</p></div>
            <div className="step-item reveal"><span>04</span><h3>We Deliver</h3><p>Custom packed items shipped across India on time.</p></div>
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-heading">
            <p className="eyebrow">Our work</p>
            <h2>A glimpse of what we deliver.</h2>
          </div>

          <div className="portfolio-grid">
            {gallery.map((item) => (
              <a className={`portfolio-card ${item.tone} reveal`} href={`#/collection/${item.slug}`} key={item.slug}>
                <div className="portfolio-shape">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>
                <p>{item.label}</p>
                <span className="portfolio-card-link">View details <span aria-hidden="true">→</span></span>
              </a>
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
          {currentCollection ? (
            <ProductWhatsAppLink
              className="primary-btn"
              item={currentCollection}
              request="get a custom quote for"
            >
              Get a Custom Quote
            </ProductWhatsAppLink>
          ) : (
            <a
              className="primary-btn"
              href={whatsappUrl("Hello FromHeart! I'd like a custom gifting quote. Occasion: ___. Quantity: ___. Budget: ___. Delivery timeline: ___.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a Custom Quote
            </a>
          )}
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
            <a
              href={whatsappUrl("Hello FromHeart! I'd like a quote for corporate gifting. Please help me with the available options.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a quote
            </a>
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

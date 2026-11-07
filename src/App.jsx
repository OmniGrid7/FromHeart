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
          {item.ideas.map((idea, index) => {
            const isObject = typeof idea === 'object' && idea !== null
            const title = isObject ? idea.name || idea.title : idea
            const image = isObject ? idea.image : null
            const alt = isObject ? idea.alt || title : title

            return (
              <article className="gift-idea-card" key={title}>
                <span className="gift-idea-number">0{index + 1}</span>
                <div className={`gift-idea-art ${image ? 'has-image' : ''}`} aria-hidden={image ? undefined : 'true'}>
                  {image ? (
                    <img src={image} alt={alt} loading="lazy" />
                  ) : (
                    <span>{item.title.charAt(0)}</span>
                  )}
                </div>
                <h3>{title}</h3>
                <p>Customisable with your logo and presented to suit your brand.</p>
                <a
                  href={whatsappUrl(`Hello FromHeart! I'd like to know more about ${title} for ${item.title}. Please share the options and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask us about this <span aria-hidden="true">→</span>
                </a>
              </article>
            )
          })}
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
          {service.offerings.map((offering, index) => {
            const isObject = typeof offering === 'object' && offering !== null
            const title = isObject ? offering.title : offering
            const description = isObject ? offering.description : 'Personalised to your brand, audience and budget.'
            const image = isObject ? offering.image : null
            const alt = isObject ? offering.alt || title : title

            return (
              <article className="service-offering reveal" key={title}>
                {image && (
                  <div className="service-offering-image-wrap">
                    <img src={image} alt={alt} loading="lazy" />
                  </div>
                )}
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  className="service-offering-link"
                  href={whatsappUrl(`Hello FromHeart! I'd like to know more about ${title} for ${service.title}. Please share the options and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask us about this <span aria-hidden="true">→</span>
                </a>
              </article>
            )
          })}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileIdeasOpen, setMobileIdeasOpen] = useState(false)

  useEffect(() => {
    const syncRoute = () => {
      const giftMatch = window.location.hash.match(/^#\/gift\/([^/?#]+)/)
      const serviceMatch = window.location.hash.match(/^#\/service\/([^/?#]+)/)
      const collectionMatch = window.location.hash.match(/^#\/collection\/([^/?#]+)/)
      setGiftSlug(giftMatch ? decodeURIComponent(giftMatch[1]) : null)
      setServiceSlug(serviceMatch ? decodeURIComponent(serviceMatch[1]) : null)
      setCollectionSlug(collectionMatch ? decodeURIComponent(collectionMatch[1]) : null)
      setMobileMenuOpen(false)
      if (giftMatch || serviceMatch || collectionMatch) window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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

  const handleNavigateHome = () => {
    setMobileMenuOpen(false)
    setGiftSlug(null)
    setServiceSlug(null)
    setCollectionSlug(null)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a
          href="#home"
          className="brand-lockup"
          onClick={handleNavigateHome}
          aria-label="FromHeart Home"
        >
          <HeartLogo />
          <div className="brand-text">FromHeart</div>
        </a>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home" onClick={handleNavigateHome}>Home</a>
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

        {/* Topbar Actions for Desktop & Mobile */}
        <div className="topbar-actions">
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

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <a
            href="#home"
            className="brand-lockup"
            onClick={handleNavigateHome}
          >
            <HeartLogo />
            <div className="brand-text">FromHeart</div>
          </a>
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-drawer-content">
          <nav className="mobile-nav-links">
            <a href="#home" onClick={handleNavigateHome}>
              Home
            </a>

            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-accordion-trigger"
                aria-expanded={mobileIdeasOpen}
                onClick={() => setMobileIdeasOpen((prev) => !prev)}
              >
                <span>Gift Ideas</span>
                <span className={`accordion-icon ${mobileIdeasOpen ? 'open' : ''}`} aria-hidden="true">⌄</span>
              </button>

              {mobileIdeasOpen && (
                <div className="mobile-accordion-content">
                  {giftIdeaGroups.map((group) => (
                    <div className="mobile-category-block" key={group.title}>
                      <div className="mobile-category-title">{group.title}</div>
                      <div className="mobile-category-items">
                        {group.items.map((item) => (
                          <a
                            href={`#/gift/${item.slug}`}
                            key={item.slug}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#solutions" onClick={() => setMobileMenuOpen(false)}>What We Do</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Specialty</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              className="primary-btn mobile-cta-btn"
              href={whatsappUrl("Hello FromHeart! I'd like a quote for corporate gifting. Please help me with the available options.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Quote on WhatsApp
            </a>
            <div className="mobile-drawer-contact-info">
              <p>Premium corporate gifting & welcome kits</p>
              <p className="mobile-phone-text">Pan-India Delivery • Quick Fulfilment</p>
            </div>
          </div>
        </div>
      </div>

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
              <a
                className="primary-btn"
                href={whatsappUrl("Hello FromHeart! I would like to receive your corporate gifting catalogue. Please share it with me.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Custom Catalogue
              </a>
              <a className="secondary-btn" href="#solutions">
                View Gift Ideas
              </a>
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
                {item.image ? (
                  <div className="info-card-image-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                ) : (
                  <div className="icon-wrap">{item.icon}</div>
                )}
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

      {/* Floating WhatsApp Action for Mobile */}
      <a
        className="mobile-floating-whatsapp"
        href={whatsappUrl(
          currentCollection
            ? productMessage(currentCollection, "get a quote for")
            : "Hello FromHeart! I would like to enquire about corporate gifting options."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FromHeart on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
        </svg>
        <span className="floating-text">Chat with us</span>
      </a>
    </div>
  )
}

export default App

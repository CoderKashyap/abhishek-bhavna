import { useEffect, useRef, useState } from 'react'
import './App.css'

const events = [
  {
    name: 'Tika Lagan',
    date: 'Monday, 7 December 2026',
    time: '4:00 PM',
    venue: 'Sindhi Dharamshala',
    address: 'A-Block, Trans Yamuna Colony, Rambagh, Agra',
    mapsQuery: 'Sindhi Dharamshala, A-Block, Trans Yamuna Colony, Rambagh, Agra',
  },
  {
    name: 'Wedding',
    date: 'Friday, 11 December 2026',
    time: '7:00 PM',
    venue: 'P.S Farm House',
    address: 'Bajna, Mathura',
    mapsQuery: '27.895925,77.682122',
  },
  {
    name: 'Reception (Pritibhoj)',
    date: 'Saturday, 12 December 2026',
    time: '7:00 PM',
    venue: 'Gupta Palace',
    address: 'Royal Chauraha, Phase-2, Trans Yamuna Colony, Agra - 6',
    mapsQuery: 'Gupta Palace, Royal Chauraha, Phase-2, Trans Yamuna Colony, Agra',
  },
] as const

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setHeroReady(true), 80)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="page">
      <div className="floral floral-a" aria-hidden="true" />
      <div className="floral floral-b" aria-hidden="true" />
      <div className="floral floral-c" aria-hidden="true" />

      <header className={`hero ${heroReady ? 'is-ready' : ''}`}>
        <div className="hero-media">
          <img
            src="/images/couple-hero.png"
            alt="Abhishek and Bhavna in festive attire"
            className="hero-photo"
          />
          <div className="hero-shade" />
        </div>

        <div className="hero-copy">
          <p className="hero-blessing">With love and blessings</p>
          <h1 className="hero-names">
            Abhishek
            <span className="hero-amp">&amp;</span>
            Bhavna
          </h1>
          <p className="hero-line">
            request the pleasure of your company as they begin a life together.
          </p>
          <p className="hero-dates">7 · 11 · 12 December 2026</p>
          <a className="hero-cta" href="#events">
            View celebrations
          </a>
        </div>
      </header>

      <main>
        <section className="section invite" aria-labelledby="invite-heading">
          <Reveal>
            <p className="eyebrow">An invitation</p>
            <h2 id="invite-heading" className="section-title">
              Join us for the sweetest of beginnings
            </h2>
            <p className="section-copy">
              From the first blessings of Tika Lagan to the joy of our wedding night
              and a warm reception among family and friends. We would be honoured
              to celebrate with you in Agra and Mathura.
            </p>
          </Reveal>
        </section>

        <section id="events" className="section events" aria-labelledby="events-heading">
          <Reveal>
            <p className="eyebrow">Celebrations</p>
            <h2 id="events-heading" className="section-title">
              Our wedding events
            </h2>
            <p className="section-copy">
              Three gatherings. One love story. Save these dates and find your way
              with the maps below.
            </p>
          </Reveal>

          <ol className="event-list">
            {events.map((event, index) => (
              <Reveal key={event.name} delay={index * 120}>
                <li className="event">
                  <div className="event-meta">
                    <span className="event-index">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="event-name">{event.name}</h3>
                  </div>
                  <div className="event-details">
                    <p className="event-when">
                      <span>{event.date}</span>
                      <span className="dot" aria-hidden="true" />
                      <span>{event.time}</span>
                    </p>
                    <p className="event-venue">{event.venue}</p>
                    <p className="event-address">{event.address}</p>
                    <a
                      className="maps-link"
                      href={mapsUrl(event.mapsQuery)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Maps
                    </a>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="section rituals" aria-labelledby="rituals-heading">
          <Reveal>
            <p className="eyebrow">Coming soon</p>
            <h2 id="rituals-heading" className="section-title">
              Haldi &amp; Mehendi
            </h2>
            <p className="section-copy">
              A joyful day of turmeric, music, and henna is being planned for the
              same day. The date will be shared shortly. Watch this space for the
              final details.
            </p>
            <div className="tbd-panel" role="note">
              <span className="tbd-label">Date &amp; venue</span>
              <span className="tbd-value">To be announced</span>
            </div>
          </Reveal>
        </section>

        <section className="section portrait" aria-labelledby="portrait-heading">
          <Reveal>
            <div className="portrait-frame">
              <img
                src="/assets/couple-landscape.png"
                alt="Abhishek and Bhavna together"
                className="portrait-photo"
              />
            </div>
            <p className="eyebrow">A quiet moment</p>
            <h2 id="portrait-heading" className="section-title">
              Two hearts, one promise
            </h2>
            <p className="section-copy">
              We cannot wait to welcome you into the warmth of our families and the
              laughter of days ahead.
            </p>
          </Reveal>
        </section>

        <section className="section closing" aria-labelledby="closing-heading">
          <Reveal>
            <p className="closing-script">Shubh vivah</p>
            <h2 id="closing-heading" className="section-title">
              We look forward to celebrating with you
            </h2>
            <p className="section-copy">
              RSVP details will follow soon. Until then, keep these dates close.
              Your presence is the greatest gift.
            </p>
            <p className="closing-names">Abhishek &amp; Bhavna</p>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <p>December 2026 · Agra &amp; Mathura</p>
      </footer>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiChevronDown, FiInstagram, FiFacebook, FiTwitter } from '../components/Icons'
import ArtworkCard from '../components/ArtworkCard'
import { artworks, artist } from '../data/artworks'
import './Home.css'

export default function Home() {
  const featuredArtworks = artworks.filter(art => art.featured).slice(0, 4)
  const [displayText, setDisplayText] = useState('')
  const [subtitleText, setSubtitleText] = useState('')
  const fullTitleText = 'Afri'
  const accentText = 'studio'
  const subtitleFullText = 'Welcome to'
  const [showCursor, setShowCursor] = useState(true)
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    // First, type the subtitle
    let subtitleIndex = 0
    const subtitleInterval = setInterval(() => {
      if (subtitleIndex <= subtitleFullText.length) {
        setSubtitleText(subtitleFullText.slice(0, subtitleIndex))
        subtitleIndex++
      } else {
        clearInterval(subtitleInterval)
        // Then type the title after subtitle completes
        let titleIndex = 0
        const titleInterval = setInterval(() => {
          if (titleIndex <= fullTitleText.length) {
            setDisplayText(fullTitleText.slice(0, titleIndex))
            titleIndex++
          } else {
            clearInterval(titleInterval)
            // Hide cursor after typing is complete
            setTimeout(() => {
              setTypingComplete(true)
              setShowCursor(false)
            }, 500)
          }
        }, 150)
      }
    }, 100)

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      if (!typingComplete) {
        setShowCursor(prev => !prev)
      }
    }, 530)

    return () => {
      clearInterval(subtitleInterval)
      clearInterval(cursorInterval)
    }
  }, [typingComplete])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920" 
            alt="Featured artwork" 
          />
          <div className="hero-overlay" />
        </div>
        
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero-subtitle">
              {subtitleText}
              <span className={`typing-cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </span>
            <h1>
              <span className="typing-text">{displayText}</span>
              <span className="accent">{accentText}</span>
            </h1>
            <p className="hero-description">
              Discover the soul of Africa through exceptional artworks that celebrate 
              tradition, modernity, and the enduring spirit of the continent.
            </p>
            <div className="hero-actions">
              <Link to="/gallery" className="btn btn-primary">
                Explore Gallery
                <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-outline hero-outline">
                About the Artist
              </Link>
            </div>
            
            <div className="hero-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <FiFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <FiTwitter size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <FiChevronDown />
        </motion.div>
      </section>

      {/* Featured Artworks */}
      <section className="featured-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Curated Collection</span>
            <h2>Featured Works</h2>
            <p className="section-description">
              Handpicked pieces that represent the depth and diversity of African artistry
            </p>
          </motion.div>

          <div className="featured-grid">
            {featuredArtworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>

          <motion.div 
            className="section-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/gallery" className="btn btn-outline">
              View All Artworks
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Artist Intro */}
      <section className="artist-intro-section">
        <div className="container">
          <div className="artist-intro-grid">
            <motion.div 
              className="artist-intro-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={artist.profileImage} alt={artist.name} />
              <div className="artist-frame" />
            </motion.div>

            <motion.div 
              className="artist-intro-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="section-subtitle">The Artist</span>
              <h2>{artist.name}</h2>
              <p className="artist-title">{artist.title}</p>
              <p className="artist-bio">{artist.bio}</p>
              <Link to="/about" className="btn btn-primary">
                Read Full Story
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="stat-number">50+</span>
              <span className="stat-label">Artworks</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="stat-number">20+</span>
              <span className="stat-label">Exhibitions</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="stat-number">15+</span>
              <span className="stat-label">Countries</span>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="stat-number">10+</span>
              <span className="stat-label">Years Experience</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Own a Piece of African Art</h2>
            <p>
              Each artwork tells a story. Let these extraordinary pieces become 
              part of your collection and your story.
            </p>
            <Link to="/gallery" className="btn btn-primary">
              Start Exploring
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

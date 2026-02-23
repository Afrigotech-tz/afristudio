import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar } from '../components/Icons'
import { artist, artworks } from '../data/artworks'
import ArtworkCard from '../components/ArtworkCard'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">The Artist</span>
            <h1>{artist.name}</h1>
            <p className="artist-location">
              <FiMapPin /> {artist.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="container">
          <div className="about-grid">
            {/* Profile Image */}
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={artist.profileImage} alt={artist.name} />
              <div className="about-image-decoration" />
            </motion.div>

            {/* Bio & Story */}
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="about-section">
                <h2>Biography</h2>
                <p>{artist.bio}</p>
              </div>

              <div className="about-section">
                <h2>My Story</h2>
                <div className="artist-story">
                  {artist.story.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="about-section">
                <h2>Artistic Philosophy</h2>
                <blockquote className="philosophy-quote">
                  <p>{artist.philosophy}</p>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="exhibitions-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">Career Highlights</span>
            <h2>Exhibitions</h2>
          </motion.div>

          <div className="exhibitions-timeline">
            {artist.exhibitions.map((exhibition, index) => (
              <motion.div 
                key={index}
                className="exhibition-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="exhibition-year">
                  <FiCalendar />
                  {exhibition.year}
                </div>
                <div className="exhibition-details">
                  <h3>{exhibition.title}</h3>
                  <p><FiMapPin /> {exhibition.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="selected-works">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">Portfolio</span>
            <h2>Selected Works</h2>
          </motion.div>

          <div className="selected-works-grid">
            {artworks.slice(0, 4).map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

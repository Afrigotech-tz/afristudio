import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiShoppingCart, FiShare2, FiHeart } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { artworks, artist } from '../data/artworks'
import './ArtworkDetail.css'

export default function ArtworkDetail() {
  const { id } = useParams()
  const { addItem, openCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  const artwork = artworks.find(a => a.id === parseInt(id))

  if (!artwork) {
    return (
      <div className="artwork-not-found">
        <h2>Artwork not found</h2>
        <Link to="/gallery" className="btn btn-primary">Back to Gallery</Link>
      </div>
    )
  }

  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    AUD: 1.53,
    TZS: 2515
  }

  const convertPrice = (price, currency) => {
    return (price * exchangeRates[currency]).toLocaleString()
  }

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AUD: 'A$',
    TZS: 'TSh'
  }

  const handleAddToCart = () => {
    addItem(artwork)
    openCart()
  }

  return (
    <div className="artwork-detail-page">
      {/* Breadcrumb */}
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/gallery">Gallery</Link>
          <span>/</span>
          <span>{artwork.title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="artwork-detail">
        <div className="container">
          <div className="artwork-detail-grid">
            {/* Image Gallery */}
            <motion.div 
              className="artwork-gallery"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="main-image">
                <img src={artwork.images[selectedImage]} alt={artwork.title} />
              </div>
              {artwork.images.length > 1 && (
                <div className="thumbnail-list">
                  {artwork.images.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`${artwork.title} view ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Artwork Info */}
            <motion.div 
              className="artwork-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="artwork-header">
                <span className="artwork-category">{artwork.category}</span>
                <h1>{artwork.title}</h1>
                <p className="artwork-year">{artwork.year}</p>
              </div>

              <div className="artwork-specs">
                <div className="spec-item">
                  <span className="spec-label">Medium</span>
                  <span className="spec-value">{artwork.medium}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Dimensions</span>
                  <span className="spec-value">{artwork.dimensions}</span>
                </div>
              </div>

              <div className="artwork-price-section">
                <div className="currency-selector">
                  {Object.keys(exchangeRates).map(currency => (
                    <button
                      key={currency}
                      className={`currency-btn ${selectedCurrency === currency ? 'active' : ''}`}
                      onClick={() => setSelectedCurrency(currency)}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
                <p className="artwork-price">
                  {currencySymbols[selectedCurrency]}{convertPrice(artwork.price, selectedCurrency)}
                </p>
              </div>

              <div className="artwork-actions">
                <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>
                  <FiShoppingCart />
                  Add to Cart
                </button>
                <button className="btn btn-outline">
                  <FiHeart />
                  Save
                </button>
                <button className="btn btn-outline share-btn">
                  <FiShare2 />
                  Share
                </button>
              </div>

              <div className="artwork-description">
                <h3>About this Artwork</h3>
                <p>{artwork.description}</p>
              </div>

              <div className="artist-card">
                <img src={artist.profileImage} alt={artist.name} />
                <div className="artist-card-info">
                  <p className="artist-label">Artist</p>
                  <h4>{artist.name}</h4>
                  <Link to="/about" className="view-profile">View Profile</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Artworks */}
      <section className="related-artworks">
        <div className="container">
          <h2>More Artworks</h2>
          <div className="related-grid">
            {artworks
              .filter(a => a.category === artwork.category && a.id !== artwork.id)
              .slice(0, 3)
              .map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/artwork/${related.id}`} className="related-item">
                    <div className="related-image">
                      <img src={related.images[0]} alt={related.title} />
                    </div>
                    <h4>{related.title}</h4>
                    <p>${related.price.toLocaleString()}</p>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

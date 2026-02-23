import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiShoppingCart } from './Icons'
import { useCart } from '../context/CartContext'
import './ArtworkCard.css'

export default function ArtworkCard({ artwork, index = 0 }) {
  const { addItem, openCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(artwork)
    openCart()
  }

  return (
    <motion.article
      className="artwork-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/artwork/${artwork.id}`} className="artwork-card-link">
        <div className="artwork-card-image">
          <img src={artwork.images[0]} alt={artwork.title} loading="lazy" />
          <div className="artwork-card-overlay">
            <button className="quick-view-btn">
              <FiEye />
              <span>View Details</span>
            </button>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
        </div>
        <div className="artwork-card-info">
          <h3 className="artwork-card-title">{artwork.title}</h3>
          <p className="artwork-card-meta">{artwork.year} • {artwork.medium}</p>
          <p className="artwork-card-price">${artwork.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.article>
  )
}

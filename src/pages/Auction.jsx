import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { auctionArtworks } from '../data/artworks'
import './Auction.css'

// Countdown timer component
function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = endTime - new Date()
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  if (timeLeft.ended) {
    return <span className="countdown-ended">Auction Ended</span>
  }

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">Min</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">Sec</span>
      </div>
    </div>
  )
}

// Auction card component
function AuctionCard({ artwork, index }) {
  const [bidAmount, setBidAmount] = useState('')
  const [bidPlaced, setBidPlaced] = useState(false)

  const minBid = artwork.currentBid + 50

  const handleBid = (e) => {
    e.preventDefault()
    if (bidAmount >= minBid) {
      setBidPlaced(true)
      setTimeout(() => {
        setBidAmount('')
        setBidPlaced(false)
      }, 3000)
    }
  }

  return (
    <motion.div 
      className="auction-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="auction-card-image">
        <img src={artwork.images[0]} alt={artwork.title} />
        <div className="auction-badge">
          <FiActivity /> Live Auction
        </div>
        {artwork.featured && (
          <div className="featured-badge">Featured</div>
        )}
      </div>

      <div className="auction-card-content">
        <div className="auction-card-header">
          <h3>{artwork.title}</h3>
          <span className="auction-year">{artwork.year}</span>
        </div>
        
        <p className="auction-medium">{artwork.medium}</p>
        <p className="auction-dimensions">{artwork.dimensions}</p>

        <div className="auction-timer">
          <FiClock />
          <CountdownTimer endTime={artwork.auctionEnd} />
        </div>

        <div className="auction-bid-info">
          <div className="bid-row">
            <span className="bid-label">Starting Bid</span>
            <span className="bid-value">${artwork.startingBid.toLocaleString()}</span>
          </div>
          <div className="bid-row current">
            <span className="bid-label">
              <FiTrendingUp /> Current Bid
            </span>
            <span className="bid-value highlight">${artwork.currentBid.toLocaleString()}</span>
          </div>
          <div className="bid-row">
            <span className="bid-label">
              <FiDollarSign /> Total Bids
            </span>
            <span className="bid-value">{artwork.bidCount}</span>
          </div>
        </div>

        <form className="bid-form" onSubmit={handleBid}>
          <div className="bid-input-group">
            <span className="currency">$</span>
            <input
              type="number"
              placeholder={`Min $${minBid.toLocaleString()}`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={minBid}
              step={50}
            />
          </div>
          <button 
            type="submit" 
            className={`bid-button ${bidPlaced ? 'success' : ''}`}
            disabled={bidPlaced}
          >
            {bidPlaced ? 'Bid Placed!' : 'Place Bid'}
          </button>
        </form>

        <Link to={`/artwork/${artwork.id}`} className="view-details-link">
          View Full Details
        </Link>
      </div>
    </motion.div>
  )
}

export default function Auction() {
  const [sortBy, setSortBy] = useState('ending-soon')

  const sortedArtworks = useMemo(() => {
    const result = [...auctionArtworks]
    
    switch (sortBy) {
      case 'ending-soon':
        result.sort((a, b) => a.auctionEnd - b.auctionEnd)
        break
      case 'price-high':
        result.sort((a, b) => b.currentBid - a.currentBid)
        break
      case 'price-low':
        result.sort((a, b) => a.currentBid - b.currentBid)
        break
      case 'most-bids':
        result.sort((a, b) => b.bidCount - a.bidCount)
        break
      default:
        break
    }

    return result
  }, [sortBy])

  const activeAuctions = auctionArtworks.filter(a => !a.auctionEnd < new Date()).length

  return (
    <div className="auction-page">
      {/* Hero */}
      <section className="auction-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <FiActivity /> Live Auctions
            </div>
            <h1>Art Auctions</h1>
            <p>Bid on unique African artworks and own a piece of cultural heritage</p>
            <div className="auction-stats">
              <div className="stat">
                <span className="stat-value">{auctionArtworks.length}</span>
                <span className="stat-label">Active Auctions</span>
              </div>
              <div className="stat">
                <span className="stat-value">${Math.max(...auctionArtworks.map(a => a.currentBid)).toLocaleString()}</span>
                <span className="stat-label">Highest Bid</span>
              </div>
              <div className="stat">
                <span className="stat-value">{auctionArtworks.reduce((acc, a) => acc + a.bidCount, 0)}</span>
                <span className="stat-label">Total Bids</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="auction-filters">
        <div className="container">
          <div className="filters-bar">
            <p className="results-count">
              {activeAuctions} active auction{activeAuctions !== 1 ? 's' : ''}
            </p>

            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="ending-soon">Ending Soon</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="most-bids">Most Bids</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Auctions Grid */}
      <section className="auction-content">
        <div className="container">
          <div className="auctions-grid">
            {sortedArtworks.map((artwork, index) => (
              <AuctionCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How Our Auctions Work</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Browse Auctions</h3>
                <p>Explore our collection of unique African artworks available for bidding</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Place Your Bid</h3>
                <p>Enter your bid amount. Minimum bid is current bid + $50</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Track Live</h3>
                <p>Watch the countdown and see new bids in real-time</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Win & Collect</h3>
                <p>If you're the highest bidder when the auction ends, the artwork is yours!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


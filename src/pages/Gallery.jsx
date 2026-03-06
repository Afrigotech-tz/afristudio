import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiGrid, FiList, FiGridSmall, FiStar } from '../components/Icons'
import ArtworkCard from '../components/ArtworkCard'
import { artworks, categories } from '../data/artworks'
import './Gallery.css'

const viewModes = [
  { id: 'grid', label: 'Grid', icon: FiGrid, description: 'Standard grid view' },
  { id: 'compact', label: 'Compact', icon: FiGridSmall, description: 'More artworks visible' },
  { id: 'featured', label: 'Featured', icon: FiStar, description: 'Featured artworks' },
  { id: 'list', label: 'List', icon: FiList, description: 'List view' },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      const keyMap = { '1': 'grid', '2': 'compact', '3': 'featured', '4': 'list' }
      if (keyMap[e.key]) {
        setViewMode(keyMap[e.key])
        setIsDropdownOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredArtworks = useMemo(() => {
    let result = [...artworks]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(art => art.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(art => 
        art.title.toLowerCase().includes(query) ||
        art.medium.toLowerCase().includes(query) ||
        art.description.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year)
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return result
  }, [selectedCategory, sortBy, searchQuery])

  const currentView = viewModes.find(v => v.id === viewMode)

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Art Gallery</h1>
            <p>Explore our collection of contemporary African artworks</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filters-bar">
            {/* Search */}
            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="sort-view-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>

              {/* Advanced View Toggle */}
              <div className="view-toggle-wrapper" ref={dropdownRef}>
                <button 
                  className="view-toggle-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="Change view mode"
                >
                  <motion.div
                    key={viewMode}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentView && <currentView.icon size={18} />}
                  </motion.div>
                  <span className="view-toggle-label">{currentView?.label}</span>
                  <motion.span 
                    className="view-toggle-arrow"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      className="view-toggle-dropdown"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="view-toggle-header">
                        <span>View Mode</span>
                        <span className="view-toggle-hint">Press 1-4</span>
                      </div>
                      <div className="view-toggle-options">
                        {viewModes.map((mode, index) => {
                          const Icon = mode.icon
                          return (
                            <motion.button
                              key={mode.id}
                              className={`view-toggle-option ${viewMode === mode.id ? 'active' : ''}`}
                              onClick={() => {
                                setViewMode(mode.id)
                                setIsDropdownOpen(false)
                              }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              <span className="view-option-icon">
                                <Icon size={18} />
                              </span>
                              <span className="view-option-label">{mode.label}</span>
                              <span className="view-option-desc">{mode.description}</span>
                              {viewMode === mode.id && (
                                <motion.span 
                                  className="view-option-check"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 500 }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </motion.span>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator bar */}
                <motion.div 
                  className="view-toggle-indicator"
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          </div>

          <p className="results-count">
            Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="gallery-content">
        <div className="container">
          {filteredArtworks.length > 0 ? (
            <motion.div 
              className={`artworks-${viewMode}`}
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredArtworks.map((artwork, index) => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork} 
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="no-results">
              <h3>No artworks found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

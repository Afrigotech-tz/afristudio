import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiGrid, FiList } from '../components/Icons'
import ArtworkCard from '../components/ArtworkCard'
import { artworks, categories } from '../data/artworks'
import './Gallery.css'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

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

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <FiList />
                </button>
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
            <div className={`artworks-${viewMode}`}>
              {filteredArtworks.map((artwork, index) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
              ))}
            </div>
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

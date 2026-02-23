import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Auction from './pages/Auction'
import ArtworkDetail from './pages/ArtworkDetail'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <CartSidebar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

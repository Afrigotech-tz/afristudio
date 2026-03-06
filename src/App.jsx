import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Auction from './pages/Auction'
import ArtworkDetail from './pages/ArtworkDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <CartSidebar />
        <AuthModal />
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
    </AuthProvider>
  )
}

export default App

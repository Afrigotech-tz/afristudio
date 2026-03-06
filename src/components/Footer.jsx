import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from './Icons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img 
                src="/assets/logo/afristudio1.svg" 
                alt="Afristudio" 
                className="logo-image"
              />
            </Link>
            <p className="footer-tagline">
              Celebrating the rich tapestry of African art and artistry
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="mailto:art@afristudio.com" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/auction">Auction</Link>
              <Link to="/about">About Artist</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-column">
              <h4>Categories</h4>
              <Link to="/gallery?category=painting">Paintings</Link>
              <Link to="/gallery?category=sculpture">Sculptures</Link>
              <Link to="/gallery?category=digital">Digital Art</Link>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <p>Arusha 23100 Tanzania</p>
              <p>art@afristudio.com</p>
              <p>beathatheonest19@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Afristudio. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

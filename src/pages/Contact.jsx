import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMail, FiPhone, FiMapPin, FiClock, 
  FiSend, FiCheckCircle 
} from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebookMessenger, FaPaypal, FaCreditCard, FaUniversity, FaMobileAlt, FaMoneyBillWave } from 'react-icons/fa'
import { contactMethods, paymentMethods } from '../data/artworks'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const paymentIcons = {
    FaPaypal: FaPaypal,
    FaCreditCard: FaCreditCard,
    FaUniversity: FaUniversity,
    FaMobileAlt: FaMobileAlt,
    FaMoneyBillWave: FaMoneyBillWave
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Get in Touch</h1>
            <p>Have questions about an artwork? Want to discuss a commission? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <div className="contact-grid">
            {/* International */}
            <motion.div 
              className="contact-methods-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>International Buyers</h2>
              <p className="method-description">For buyers outside Tanzania</p>
              
              <div className="methods-list">
                {contactMethods.international.map((method) => (
                  <a 
                    key={method.id}
                    href={method.id === 'email' ? `mailto:${method.value}` : method.id === 'whatsapp' ? `https://wa.me/${method.value.replace(/\D/g, '')}` : '#'}
                    className="method-item"
                    target={method.id !== 'email' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    <div className="method-icon">
                      {method.id === 'whatsapp' ? <FaWhatsapp /> : 
                       method.id === 'instagram' ? <FaInstagram /> : <FiMail />}
                    </div>
                    <div className="method-info">
                      <span className="method-name">{method.name}</span>
                      <span className="method-value">{method.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Domestic */}
            <motion.div 
              className="contact-methods-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2>Domestic Buyers</h2>
              <p className="method-description">For buyers within Tanzania</p>
              
              <div className="methods-list">
                {contactMethods.domestic.map((method) => (
                  <a 
                    key={method.id}
                    href={method.id === 'phone' ? `tel:${method.value}` : '#'}
                    className="method-item"
                  >
                    <div className="method-icon">
                      {method.id === 'phone' ? <FiPhone /> : <FaFacebookMessenger />}
                    </div>
                    <div className="method-info">
                      <span className="method-name">{method.name}</span>
                      <span className="method-value">{method.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Response Time */}
          <motion.div 
            className="response-time"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FiClock />
            <span>Average response time: Within 24 hours</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-grid">
            <motion.div 
              className="form-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Send a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              {isSubmitted ? (
                <div className="success-message">
                  <FiCheckCircle />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="purchase">Inquiry about purchase</option>
                      <option value="commission">Commission request</option>
                      <option value="exhibition">Exhibition inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <FiSend />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Location */}
            <motion.div 
              className="location-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2>Visit Our Studio</h2>
              <div className="location-details">
                <div className="location-item">
                  <FiMapPin />
                  <div>
                    <h4>Studio Address</h4>
                    <p>123 Art District<br />Arusha, Tanzania</p>
                  </div>
                </div>
                <div className="location-item">
                  <FiClock />
                  <div>
                    <h4>Studio Hours</h4>
                    <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="payment-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">Secure Payments</span>
            <h2>Payment Options</h2>
            <p>We offer flexible payment methods for your convenience</p>
          </motion.div>

          <div className="payment-grid">
            {/* International Payments */}
            <motion.div 
              className="payment-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>International Payments</h3>
              <div className="payment-methods">
                {paymentMethods.international.map((method) => {
                  const Icon = paymentIcons[method.icon]
                  return (
                    <div key={method.id} className="payment-item">
                      <div className="payment-icon">
                        <Icon />
                      </div>
                      <div className="payment-info">
                        <span className="payment-name">{method.name}</span>
                        <span className="payment-desc">{method.description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Domestic Payments */}
            <motion.div 
              className="payment-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>Domestic Payments</h3>
              <div className="payment-methods">
                {paymentMethods.domestic.map((method) => {
                  const Icon = paymentIcons[method.icon]
                  return (
                    <div key={method.id} className="payment-item">
                      <div className="payment-icon">
                        <Icon />
                      </div>
                      <div className="payment-info">
                        <span className="payment-name">{method.name}</span>
                        <span className="payment-desc">{method.description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

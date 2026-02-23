import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './CartSidebar.css'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside 
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="cart-header">
              <h3>Your Cart</h3>
              <button className="close-cart" onClick={closeCart} aria-label="Close cart">
                <FiX />
              </button>
            </div>

            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty</p>
                  <Link to="/gallery" className="btn btn-outline" onClick={closeCart}>
                    Browse Gallery
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <div className="cart-item-image">
                      <img src={item.images[0]} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <p className="cart-item-price">${item.price.toLocaleString()}</p>
                      <div className="cart-item-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="remove-item" 
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span className="subtotal-amount">${subtotal.toLocaleString()}</span>
                </div>
                <p className="cart-note">Shipping and taxes calculated at checkout</p>
                <button className="btn btn-primary checkout-btn">
                  Proceed to Checkout
                </button>
                <button className="continue-shopping" onClick={closeCart}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

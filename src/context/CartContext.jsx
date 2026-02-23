import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
  items: [],
  isOpen: false
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      }
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('afristudio-cart')
      if (saved) {
        try {
          return { ...initial, items: JSON.parse(saved) }
        } catch (e) {
          console.error('Failed to parse cart from localStorage')
        }
      }
    }
    return initial
  })

  useEffect(() => {
    localStorage.setItem('afristudio-cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login', 'signup', 'verify-otp'
  const [isLoading, setIsLoading] = useState(true)
  const [pendingUser, setPendingUser] = useState(null) // Store user data pending OTP verification

  // Check for existing token and user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')

      if (token && savedUser) {
        try {
          // Try to get current user from API
          const response = await authAPI.getCurrentUser()
          setUser(response.data || response.user || response)
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
    setAuthMode('login')
    setPendingUser(null)
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      
      // Handle different response structures
      const token = response.token || response.access_token
      const userData = response.user || response.data?.user || response.data

      if (token) {
        localStorage.setItem('token', token)
      }
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }
      
      closeAuthModal()
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Login failed. Please try again.'
      throw new Error(message)
    }
  }

  const forgotPassword = async (login) => {
    try {
      await authAPI.forgotPassword(login)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to send OTP. Please try again.'
      throw new Error(message)
    }
  }

  const resetPassword = async (login, code, password, passwordConfirmation) => {
    try {
      await authAPI.resetPassword(login, code, password, passwordConfirmation)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Password reset failed. Please try again.'
      throw new Error(message)
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      
      // Store pending user data for OTP verification
      // The API should return email/phone for OTP sending
      const verificationData = {
        email: userData.email || null,
        phone: userData.phone || null,
        name: userData.name
      }
      setPendingUser(verificationData)
      
      // Switch to OTP verification mode
      setAuthMode('verify-otp')
      
      return { success: true, needsVerification: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.'
      throw new Error(message)
    }
  }

  const verifyOTP = async (otp) => {
    try {
      // Get identifier from pending user data
      const identifier = pendingUser?.email || pendingUser?.phone
      
      const response = await authAPI.verifyOTP(identifier, otp)
      
      // Handle successful verification
      const token = response.token || response.access_token
      const userData = response.user || response.data?.user || response.data

      if (token) {
        localStorage.setItem('token', token)
      }
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }
      
      setPendingUser(null)
      closeAuthModal()
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'OTP verification failed. Please try again.'
      throw new Error(message)
    }
  }

  const resendOTP = async () => {
    try {
      const identifier = pendingUser?.email || pendingUser?.phone
      await authAPI.resendOTP(identifier)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to resend OTP. Please try again.'
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  const value = {
    user,
    isAuthModalOpen,
    authMode,
    isLoading,
    pendingUser,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    forgotPassword,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


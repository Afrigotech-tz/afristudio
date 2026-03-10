import axios from 'axios'

const API_BASE_URL = 'https://afristudio.optimalservicesllc.net/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  // Login with email or phone - API expects {login, password}
  login: async (credentials) => {
    // credentials can contain either email or phone as 'login'
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Verify OTP after registration
  verifyOTP: async (identifier, code) => {
    const response = await api.post('/auth/verify-account', { identifier, code })
    return response.data
  },

  // Resend OTP
  resendOTP: async (identifier) => {
    const response = await api.post('/auth/resend-otp', { identifier })
    return response.data
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Forgot password - Send OTP to email/phone
  forgotPassword: async (login) => {
    const response = await api.post('/auth/forgot-password', { login })
    return response.data
  },

  // Reset password - Verify OTP & Update password
  resetPassword: async (login, code, password, passwordConfirmation) => {
    const response = await api.post('/auth/reset-password', { 
      login, 
      code, 
      password, 
      password_confirmation: passwordConfirmation 
    })
    return response.data
  },
}

export default api


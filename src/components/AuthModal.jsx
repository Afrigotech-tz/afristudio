import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMail, FiPhone, FiUser, FiLock, FiArrowRight, FiAlertCircle, FiCheck } from './Icons'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    authMode, 
    closeAuthModal, 
    login, 
    register, 
    verifyOTP, 
    resendOTP,
    pendingUser,
    forgotPassword,
    resetPassword,
  } = useAuth()
  
  const [mode, setMode] = useState(authMode)
  const [identifierType, setIdentifierType] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''], // 6-digit OTP
    resetPassword: '', // For forgot password flow
    resetConfirmPassword: '',
  })
  const [resetLogin, setResetLogin] = useState('') // Store login for password reset
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [otpResent, setOtpResent] = useState(false)
  
  const otpInputRefs = useRef([])

  // Sync mode with authMode prop
  useEffect(() => {
    setMode(authMode)
  }, [authMode])

  const switchMode = (newMode) => {
    setMode(newMode)
    setErrors({})
    setApiError('')
    setSuccessMessage('')
    setOtpResent(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      otp: ['', '', '', '', '', ''],
      resetPassword: '',
      resetConfirmPassword: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('')
    }
  }

  const handleOTPChange = (index, value) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...formData.otp]
    newOtp[index] = value.slice(-1) // Keep only last character
    setFormData((prev) => ({ ...prev, otp: newOtp }))
    setApiError('')

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOTPKeyDown = (index, e) => {
    // Handle backspace - focus previous input
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOTPPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6)
    setFormData((prev) => ({ ...prev, otp: newOtp }))
    
    // Focus last filled input or first empty
    const lastFilledIndex = pastedData.length - 1
    otpInputRefs.current[Math.min(lastFilledIndex, 5)]?.focus()
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (mode === 'forgot-password') {
      // Validate for forgot password - need email OR phone
      if (identifierType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email'
        }
      } else {
        const phoneRegex = /^\+?[\d\s-]{10,}$/
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required'
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number'
        }
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    if (mode === 'reset-password') {
      // Validate OTP
      const otpString = formData.otp.join('')
      if (otpString.length !== 6) {
        newErrors.otp = 'Please enter the complete 6-digit OTP'
      }

      // Validate passwords
      if (!formData.resetPassword) {
        newErrors.resetPassword = 'New password is required'
      } else if (formData.resetPassword.length < 6) {
        newErrors.resetPassword = 'Password must be at least 6 characters'
      }

      if (formData.resetPassword !== formData.resetConfirmPassword) {
        newErrors.resetConfirmPassword = 'Passwords do not match'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      }
    }

    if (identifierType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    } else {
      const phoneRegex = /^\+?[\d\s-]{10,}$/
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOTP = () => {
    const otpString = formData.otp.join('')
    if (otpString.length !== 6) {
      setApiError('Please enter the complete 6-digit OTP')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (mode === 'verify-otp') {
      if (!validateOTP()) return
      setIsLoading(true)
      setApiError('')
      
      try {
        const otpString = formData.otp.join('')
        await verifyOTP(otpString)
        setSuccessMessage('Email verified successfully! Redirecting...')
      } catch (error) {
        setApiError(error.message || 'OTP verification failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Handle forgot password - send OTP
    if (mode === 'forgot-password') {
      if (!validateForm()) return
      setIsLoading(true)
      setApiError('')
      
      try {
        const loginValue = identifierType === 'email' ? formData.email : formData.phone
        await forgotPassword(loginValue)
        
        // Store login for reset password flow
        setResetLogin(loginValue)
        
        // Switch to reset password mode with OTP
        setMode('reset-password')
        setSuccessMessage('OTP sent! Please check your email/phone and enter the code.')
      } catch (error) {
        setApiError(error.message || 'Failed to send OTP. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Handle reset password - verify OTP and update password
    if (mode === 'reset-password') {
      if (!validateForm()) return
      setIsLoading(true)
      setApiError('')
      
      try {
        const otpString = formData.otp.join('')
        await resetPassword(resetLogin, otpString, formData.resetPassword, formData.resetConfirmPassword)
        
        setSuccessMessage('Password reset successfully! You can now sign in.')
        
        // Switch to login mode after successful password reset
        setTimeout(() => {
          switchMode('login')
          setFormData(prev => ({
            ...prev,
            password: '',
            confirmPassword: '',
          }))
        }, 2000)
      } catch (error) {
        setApiError(error.message || 'Failed to reset password. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    if (!validateForm()) return

    setIsLoading(true)
    setApiError('')

    try {
      if (mode === 'login') {
        // Prepare login credentials - API expects {login, password}
        // login can be either email or phone
        const credentials = identifierType === 'email' 
          ? { login: formData.email, password: formData.password }
          : { login: formData.phone, password: formData.password }
        
        await login(credentials)
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          otp: ['', '', '', '', '', ''],
        })
      } else {
        // Prepare registration data
        const userData = {
          name: formData.name,
          password: formData.password,
          ...(identifierType === 'email' 
            ? { email: formData.email }
            : { phone: formData.phone })
        }
        
        await register(userData)
        
        // Don't reset form - we'll show OTP screen
        setSuccessMessage('Registration successful! Please verify your email.')
      }
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setApiError('')
    setOtpResent(false)
    
    try {
      await resendOTP()
      setOtpResent(true)
      setSuccessMessage('OTP resent successfully!')
      setTimeout(() => setOtpResent(false), 3000)
    } catch (error) {
      setApiError(error.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    closeAuthModal()
    setErrors({})
    setApiError('')
    setSuccessMessage('')
  }

  const getVerificationTarget = () => {
    if (pendingUser?.email) return pendingUser.email
    if (pendingUser?.phone) return pendingUser.phone
    return ''
  }

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div 
          className="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className="auth-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="auth-close" onClick={handleClose} aria-label="Close">
              <FiX />
            </button>

            {/* OTP Verification Screen */}
            {mode === 'verify-otp' ? (
              <div className="otp-verification">
                <div className="auth-header">
                  <div className="otp-icon">
                    <FiMail size={40} />
                  </div>
                  <h2>Verify Your Email</h2>
                  <p>
                    We've sent a 6-digit verification code to<br />
                    <strong>{getVerificationTarget()}</strong>
                  </p>
                </div>

                {/* API Error Display */}
                {apiError && (
                  <div className="api-error">
                    <FiAlertCircle size={18} />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="api-success">
                    <FiCheck size={18} />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="otp-input-container">
                    <label className="form-label">Enter Verification Code</label>
                    <div className="otp-inputs" onPaste={handleOTPPaste}>
                      {formData.otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          onKeyDown={(e) => handleOTPKeyDown(index, e)}
                          className="otp-input"
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                    {errors.otp && <span className="error-message">{errors.otp}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner small"></span>
                    ) : (
                      <>
                        Verify & Continue
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="otp-resend">
                  <span>Didn't receive the code?</span>
                  <button 
                    type="button" 
                    onClick={handleResendOTP}
                    disabled={isLoading || otpResent}
                  >
                    {otpResent ? 'OTP Sent!' : 'Resend Code'}
                  </button>
                </div>

                <p className="auth-footer">
                  <button 
                    type="button" 
                    onClick={() => switchMode('signup')}
                    disabled={isLoading}
                  >
                    ← Back to Registration
                  </button>
                </p>
              </div>
            ) : mode === 'forgot-password' ? (
              // Forgot Password - Request OTP
              <div className="forgot-password-screen">
                <div className="auth-header">
                  <div className="otp-icon">
                    <FiLock size={40} />
                  </div>
                  <h2>Reset Your Password</h2>
                  <p>
                    Enter your email address or phone number<br />
                    and we'll send you a verification code
                  </p>
                </div>

                {/* API Error Display */}
                {apiError && (
                  <div className="api-error">
                    <FiAlertCircle size={18} />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="api-success">
                    <FiCheck size={18} />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="identifier-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${identifierType === 'email' ? 'active' : ''}`}
                      onClick={() => setIdentifierType('email')}
                      disabled={isLoading}
                    >
                      <FiMail size={16} />
                      Email
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${identifierType === 'phone' ? 'active' : ''}`}
                      onClick={() => setIdentifierType('phone')}
                      disabled={isLoading}
                    >
                      <FiPhone size={16} />
                      Phone
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="input-wrapper">
                      {identifierType === 'email' ? (
                        <FiMail className="input-icon" />
                      ) : (
                        <FiPhone className="input-icon" />
                      )}
                      <input
                        type={identifierType === 'email' ? 'email' : 'tel'}
                        name={identifierType}
                        value={formData[identifierType]}
                        onChange={handleChange}
                        placeholder={identifierType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        className={`form-input ${errors[identifierType] ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors[identifierType] && (
                      <span className="error-message">{errors[identifierType]}</span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner small"></span>
                    ) : (
                      <>
                        Send Verification Code
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <p className="auth-footer">
                  <button 
                    type="button" 
                    onClick={() => switchMode('login')}
                    disabled={isLoading}
                  >
                    ← Back to Sign In
                  </button>
                </p>
              </div>
            ) : mode === 'reset-password' ? (
              // Reset Password - Enter OTP and new password
              <div className="reset-password-screen">
                <div className="auth-header">
                  <div className="otp-icon">
                    <FiLock size={40} />
                  </div>
                  <h2>Enter New Password</h2>
                  <p>
                    We've sent a verification code to<br />
                    <strong>{resetLogin}</strong>
                  </p>
                </div>

                {/* API Error Display */}
                {apiError && (
                  <div className="api-error">
                    <FiAlertCircle size={18} />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="api-success">
                    <FiCheck size={18} />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="otp-input-container">
                    <label className="form-label">Enter Verification Code</label>
                    <div className="otp-inputs" onPaste={handleOTPPaste}>
                      {formData.otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          onKeyDown={(e) => handleOTPKeyDown(index, e)}
                          className="otp-input"
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                    {errors.otp && <span className="error-message">{errors.otp}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="resetPassword"
                        value={formData.resetPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className={`form-input ${errors.resetPassword ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.resetPassword && <span className="error-message">{errors.resetPassword}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="resetConfirmPassword"
                        value={formData.resetConfirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className={`form-input ${errors.resetConfirmPassword ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.resetConfirmPassword && <span className="error-message">{errors.resetConfirmPassword}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner small"></span>
                    ) : (
                      <>
                        Reset Password
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <p className="auth-footer">
                  <button 
                    type="button" 
                    onClick={() => switchMode('forgot-password')}
                    disabled={isLoading}
                  >
                    ← Request New Code
                  </button>
                </p>
              </div>
            ) : (
              // Login/Signup Forms
              <>
                <div className="auth-header">
                  <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                  <p>
                    {mode === 'login' 
                      ? 'Sign in to continue to Afristudio' 
                      : 'Join Afristudio to explore and collect art'}
                  </p>
                </div>

                <div className="auth-tabs">
                  <button 
                    className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                    onClick={() => switchMode('login')}
                  >
                    Sign In
                  </button>
                  <button 
                    className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                    onClick={() => switchMode('signup')}
                  >
                    Sign Up
                  </button>
                </div>

                {/* API Error Display */}
                {apiError && (
                  <div className="api-error">
                    <FiAlertCircle size={18} />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="api-success">
                    <FiCheck size={18} />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                  {mode === 'signup' && (
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <div className="input-wrapper">
                        <FiUser className="input-icon" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={`form-input ${errors.name ? 'error' : ''}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                  )}

                  <div className="identifier-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${identifierType === 'email' ? 'active' : ''}`}
                      onClick={() => setIdentifierType('email')}
                      disabled={isLoading}
                    >
                      <FiMail size={16} />
                      Email
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${identifierType === 'phone' ? 'active' : ''}`}
                      onClick={() => setIdentifierType('phone')}
                      disabled={isLoading}
                    >
                      <FiPhone size={16} />
                      Phone
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="input-wrapper">
                      {identifierType === 'email' ? (
                        <FiMail className="input-icon" />
                      ) : (
                        <FiPhone className="input-icon" />
                      )}
                      <input
                        type={identifierType === 'email' ? 'email' : 'tel'}
                        name={identifierType}
                        value={formData[identifierType]}
                        onChange={handleChange}
                        placeholder={identifierType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        className={`form-input ${errors[identifierType] ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors[identifierType] && (
                      <span className="error-message">{errors[identifierType]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrapper">
                      <FiLock className="input-icon" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  {mode === 'signup' && (
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <div className="input-wrapper">
                        <FiLock className="input-icon" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <span className="error-message">{errors.confirmPassword}</span>
                      )}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="forgot-password">
                      <button 
                        type="button" 
                        className="forgot-password-btn"
                        onClick={() => switchMode('forgot-password')}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner small"></span>
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-divider">
                  <span>or continue with</span>
                </div>

                <div className="social-login">
                  <button className="social-btn google" disabled={isLoading}>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="social-btn facebook" disabled={isLoading}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                <p className="auth-footer">
                  {mode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button type="button" onClick={() => switchMode('signup')} disabled={isLoading}>
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button type="button" onClick={() => switchMode('login')} disabled={isLoading}>
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


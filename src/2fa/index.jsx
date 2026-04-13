import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function TwoFAPage() {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [seconds, setSeconds] = useState(45)
  const navigate = useNavigate()
  const inputs = useRef([])

  React.useEffect(() => {
    const timer = seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  const handleInput = (value, idx) => {
    if (!/^[0-9]*$/.test(value)) return
    const next = [...otp]
    next[idx] = value.slice(-1)
    setOtp(next)
    if (value && idx < inputs.current.length - 1) {
      inputs.current[idx + 1].focus()
    }
  }

  const handleKeyDown = (event, idx) => {
    if (event.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1].focus()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const code = otp.join('')
    if (code.length === 4) {
      alert('Kode OTP dikirim: ' + code)
      navigate('/')
    } else {
      alert('Masukkan 4 digit kode OTP dulu.')
    }
  }

  const handleResend = () => {
    setSeconds(45)
    alert('Kode baru telah dikirim.')
  }

  return (
    <div
      className="twofa-page"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#f4f4f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="twofa-card">
        <div className="twofa-header">
          <img
            src="/logo-careofyou.png"
            alt="Careofyou logo"
            className="twofa-logo"
          />
          <p className="twofa-title">Enter 4-digit OTP code</p>
        </div>

        <form className="twofa-form" onSubmit={handleSubmit}>
          <div className="otp-row">
            {otp.map((value, idx) => (
              <input
                key={idx}
                ref={(el) => (inputs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleInput(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="otp-input"
              />
            ))}
          </div>

          <div className="otp-meta">
            <span>{seconds > 0 ? `00:${seconds.toString().padStart(2, '0')}` : 'Code expired'}</span>
            <button type="button" className="resend-button" onClick={handleResend}>
              Resend Code
            </button>
          </div>

          <button type="submit" className="verify-button">
            Verify
          </button>
        </form>
      </div>
    </div>
  )
}

export default TwoFAPage

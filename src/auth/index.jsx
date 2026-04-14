import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

/* ── Icons ─────────────────────────────────────────────── */
const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* ── PwField helper ─────────────────────────────────────── */
function PwField({ label, name, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      <div className="field-pw-wrap">
        <input
          className="field-input"
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        <button type="button" className="pw-toggle" onClick={() => setShow(v => !v)}>
          {show ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  );
}

/* ── Panel text per mode ────────────────────────────────── */
const PANEL_COPY = {
  login:    { heading: "Welcome back.", sub: "Sign in and continue\nyour skincare journey." },
  register: { heading: "Join careofyou.", sub: "Create an account and start\nglowing today." },
};

/* ── Main component ─────────────────────────────────────── */
export default function AuthPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [mode, setMode] = useState(
    location.pathname === "/register" ? "register" : "login"
  );
  const [panelText, setPanelText] = useState(PANEL_COPY[mode]);

  // Login state
  const [loginForm,    setLoginForm]    = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError,   setLoginError]   = useState("");

  // Register state
  const [regForm,    setRegForm]    = useState({ name: "", email: "", password: "", confirm: "" });
  const [regLoading, setRegLoading] = useState(false);
  const [regError,   setRegError]   = useState("");

  /* ── Switch mode with smooth transition ── */
  const switchMode = (next) => {
    if (next === mode) return;
    // update URL immediately
    navigate(next === "login" ? "/login" : "/register", { replace: true });
    // swap panel text after panel reaches midpoint (~300ms)
    setTimeout(() => setPanelText(PANEL_COPY[next]), 320);
    setMode(next);
  };

  /* ── Handlers ── */
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setTimeout(() => { setLoginLoading(false); navigate("/"); }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) { setRegError("Passwords do not match."); return; }
    if (regForm.password.length < 6)          { setRegError("Password must be at least 6 characters."); return; }
    setRegLoading(true);
    setRegError("");
    setTimeout(() => { setRegLoading(false); switchMode("login"); }, 1000);
  };

  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* ════ SLIDING PANEL ════ */}
      <div className={`auth-panel${isLogin ? " panel-right" : " panel-left"}`}>
        {/* decorative circles */}
        <div className="panel-circle panel-circle-a" />
        <div className="panel-circle panel-circle-b" />

        <div className="panel-content">
          <div className="panel-logo-wrap">
            <img src="/logo-careofyou.png" alt="Careofyou" className="panel-logo" />
          </div>
          <p className="panel-brand">careofyou</p>
          <h2 className="panel-heading">{panelText.heading}</h2>
          <p className="panel-sub">{panelText.sub}</p>
          <div className="panel-dots">
            <span className={isLogin    ? "dot dot-active" : "dot"} onClick={() => switchMode("login")}    />
            <span className={!isLogin   ? "dot dot-active" : "dot"} onClick={() => switchMode("register")} />
          </div>
        </div>
      </div>

      {/* ════ LOGIN FORM — left side ════ */}
      <div className={`auth-side auth-side-left${isLogin ? " side-visible" : " side-hidden side-hidden-left"}`}>
        <div className="auth-card">
          <div className="auth-card-top">
            <h2 className="auth-title">Sign in</h2>
            <p className="auth-subtitle">Good to have you back ✨</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>

            <PwField
              label="Password"
              name="password"
              placeholder="••••••••"
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            />

            <div className="forgot-row">
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            {loginError && <p className="auth-error">{loginError}</p>}

            <button type="submit" className="auth-btn" disabled={loginLoading}>
              {loginLoading ? <span className="auth-spinner" /> : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <span onClick={() => switchMode("register")}>Create one</span>
          </p>
        </div>
      </div>

      {/* ════ REGISTER FORM — right side ════ */}
      <div className={`auth-side auth-side-right${!isLogin ? " side-visible" : " side-hidden side-hidden-right"}`}>
        <div className="auth-card">
          <div className="auth-card-top">
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Let's get you glowing 🌿</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input
                className="field-input"
                type="text"
                placeholder="Sara Tancredi"
                value={regForm.name}
                onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={regForm.email}
                onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                required
              />
            </div>

            <PwField
              label="Password"
              name="password"
              placeholder="Min. 6 characters"
              value={regForm.password}
              onChange={e => setRegForm({ ...regForm, password: e.target.value })}
            />

            <PwField
              label="Confirm Password"
              name="confirm"
              placeholder="Repeat your password"
              value={regForm.confirm}
              onChange={e => setRegForm({ ...regForm, confirm: e.target.value })}
            />

            {regError && <p className="auth-error">{regError}</p>}

            <button type="submit" className="auth-btn" disabled={regLoading}>
              {regLoading ? <span className="auth-spinner" /> : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <span onClick={() => switchMode("login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

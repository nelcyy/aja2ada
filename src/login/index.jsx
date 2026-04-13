import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // sementara mock login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,

      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <div style={{ marginBottom: "28px" }}>
          <img
            src="/logo-careofyou.png"
            alt="Careofyou"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          {/* FORGOT PASSWORD */}
          <div style={{ textAlign: "left" }}>
            <a
              href="/forgot-password"
              style={{
                fontSize: "14px",
                color: "#e07a73",
                textDecoration: "underline",
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          {/* REGISTER */}
          <p
            style={{
              marginTop: "18px",
              fontSize: "15px",
              color: "#666",
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#e07a73",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
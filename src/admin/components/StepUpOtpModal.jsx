import { useEffect, useRef, useState } from "react";

export default function StepUpOtpModal({
  open,
  title,
  description,
  demoCode = "123456",
  confirmLabel = "Verify OTP",
  onVerify,
  onClose,
}) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setCode("");
      setStatus("idle");
      setMessage("");
      setSubmitting(false);
    }
  }, [open, title]);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, []);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!code.trim()) {
      setStatus("error");
      setMessage("Masukkan kode OTP dulu ya.");
      return;
    }

    setSubmitting(true);
    const result = await onVerify(code.trim());
    setSubmitting(false);

    if (result?.ok) {
      setStatus("success");
      setMessage(result.message || "OTP verified successfully.");
      closeTimerRef.current = setTimeout(() => onClose(true), 900);
      return;
    }

    setStatus("error");
    setMessage(result?.message || "OTP verification failed.");
  };

  return (
    <div className="adm-modal-overlay" onClick={() => !submitting && onClose(false)}>
      <div className="adm-modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="adm-modal-header">
          <div>
            <p className="adm-modal-kicker">Step-up verification</p>
            <h3 className="adm-modal-title">{title}</h3>
          </div>
          <button className="adm-modal-close" onClick={() => onClose(false)} disabled={submitting}>
            x
          </button>
        </div>

        <p className="adm-modal-desc">{description}</p>

        <div className="adm-modal-demo-note">
          Demo only. Use OTP code <strong>{demoCode}</strong>.
        </div>

        <form className="adm-otp-form" onSubmit={handleSubmit}>
          <label className="adm-otp-label" htmlFor="otp-code">
            Enter OTP
          </label>
          <input
            id="otp-code"
            className="adm-otp-input"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            disabled={submitting}
          />

          {message && (
            <div className={`adm-otp-feedback adm-otp-feedback--${status}`}>
              {message}
            </div>
          )}

          <div className="adm-modal-actions">
            <button type="button" className="adm-ghost-btn" onClick={() => onClose(false)} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="adm-primary-btn" disabled={submitting}>
              {submitting ? "Verifying..." : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

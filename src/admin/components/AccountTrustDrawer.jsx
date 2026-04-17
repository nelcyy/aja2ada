import { ACCOUNT_TRUST_META, FLAG_SEVERITY_META, SESSION_STATUS_META } from "../mockData";

export default function AccountTrustDrawer({
  open,
  account,
  relatedFlags,
  contextLabel,
  onClose,
  onRequireReverify,
  onForceLogout,
  onMarkTrusted,
}) {
  if (!open || !account) return null;

  const trustMeta = ACCOUNT_TRUST_META[account.trust_status];
  const sessionMeta = SESSION_STATUS_META[account.session_status];

  return (
    <>
      <div className="adm-drawer-overlay" onClick={onClose} />
      <aside className="adm-flag-drawer adm-account-drawer">
        <div className="adm-flag-drawer-header">
          <div>
            <p className="adm-modal-kicker">{contextLabel || "Account trust review"}</p>
            <h3 className="adm-modal-title">{account.name}</h3>
            <p className="adm-account-drawer-sub">{account.email} - {account.role}</p>
          </div>
          <button className="adm-modal-close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="adm-flag-drawer-body">
          <div className="adm-flag-meta-row">
            <span className="adm-status-pill" style={{ color: trustMeta.color, background: trustMeta.bg }}>
              {trustMeta.label}
            </span>
            <span className="adm-status-pill" style={{ color: sessionMeta.color, background: sessionMeta.bg }}>
              {sessionMeta.label}
            </span>
          </div>

          <div className="adm-account-summary-grid">
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Trust Score</span>
              <strong>{account.activity_snapshot.trust_score}/100</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Failed Logins 24h</span>
              <strong>{account.failed_logins_24h}</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Orders 24h</span>
              <strong>{account.activity_snapshot.orders_24h}</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Return Requests 30d</span>
              <strong>{account.activity_snapshot.return_requests_30d}</strong>
            </div>
          </div>

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Suggested Action</p>
            <p className="adm-flag-summary-text">{account.suggestion}</p>
          </div>

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Current Session</p>
            <p className="adm-flag-summary-text">
              {account.current_device} on IP {account.ip_address}
            </p>
            <p className="adm-account-inline-meta">
              Last login {account.last_login} - Last activity {account.last_activity}
            </p>
          </div>

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Suspicious Signals</p>
            <div className="adm-account-signal-list">
              {account.suspicious_signals.map((signal, index) => (
                <div key={`${account.id}-${index}`} className="adm-account-signal-item">
                  <span className="adm-flag-timeline-dot" />
                  <p className="adm-flag-summary-text">{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Related Flags</p>
            {relatedFlags.length === 0 ? (
              <p className="adm-flag-summary-text">No active monitoring flags linked to this account right now.</p>
            ) : (
              <div className="adm-account-related-flags">
                {relatedFlags.map((flag) => {
                  const severityMeta = FLAG_SEVERITY_META[flag.severity];
                  return (
                    <div key={flag.id} className="adm-account-related-flag">
                      <div className="adm-account-related-top">
                        <span className="adm-order-id">{flag.id}</span>
                        <span className="adm-status-pill" style={{ color: severityMeta.color, background: severityMeta.bg }}>
                          {severityMeta.label}
                        </span>
                      </div>
                      <p className="adm-account-related-title">{flag.reason}</p>
                      <p className="adm-account-inline-meta">{flag.suggested_action}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="adm-flag-timeline">
            <p className="adm-flag-summary-label">Login and Activity Timeline</p>
            <div className="adm-flag-timeline-list">
              {account.login_timeline.map((item, index) => (
                <div key={`${account.id}-timeline-${index}`} className="adm-flag-timeline-item">
                  <span className="adm-flag-timeline-dot" />
                  <div>
                    <p className="adm-flag-timeline-title">{item.label}</p>
                    <p className="adm-flag-timeline-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="adm-flag-drawer-actions">
          <button
            className="adm-ghost-btn"
            onClick={() => onMarkTrusted(account.id)}
            disabled={account.trust_status === "trusted"}
          >
            Mark Trusted
          </button>
          <button
            className="adm-ghost-btn adm-ghost-btn--violet"
            onClick={() => onRequireReverify(account.id)}
            disabled={account.session_status === "reverification" || account.session_status === "logged_out"}
          >
            Require Reverify
          </button>
          <button
            className="adm-act-btn adm-act-btn--danger adm-act-btn--danger-text"
            onClick={() => onForceLogout(account.id)}
            disabled={account.session_status === "logged_out"}
          >
            Force Logout
          </button>
        </div>
      </aside>
    </>
  );
}

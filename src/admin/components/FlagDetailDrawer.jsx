import { ACCOUNT_TRUST_META, FLAG_SEVERITY_META, FLAG_STATUS_META } from "../mockData";

export default function FlagDetailDrawer({
  open,
  flag,
  accountProfile,
  onOpenAccount,
  onClose,
  onMarkReviewed,
  onResolve,
  onEscalate,
}) {
  if (!open || !flag) return null;

  const severityMeta = FLAG_SEVERITY_META[flag.severity];
  const statusMeta = FLAG_STATUS_META[flag.status];

  return (
    <>
      <div className="adm-drawer-overlay" onClick={onClose} />
      <aside className="adm-flag-drawer">
        <div className="adm-flag-drawer-header">
          <div>
            <p className="adm-modal-kicker">Flag detail</p>
            <h3 className="adm-modal-title">{flag.id}</h3>
          </div>
          <button className="adm-modal-close" onClick={onClose}>
            x
          </button>
        </div>

        <div className="adm-flag-drawer-body">
          <div className="adm-flag-meta-row">
            <span className="adm-status-pill" style={{ color: severityMeta.color, background: severityMeta.bg }}>
              {severityMeta.label} severity
            </span>
            <span className="adm-status-pill" style={{ color: statusMeta.color, background: statusMeta.bg }}>
              {statusMeta.label}
            </span>
          </div>

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Reason</p>
            <p className="adm-flag-summary-text">{flag.reason}</p>
          </div>

          <div className="adm-flag-detail-grid">
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Rule Code</span>
              <strong>{flag.rule_code}</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Related User</span>
              <strong>{flag.related_user}</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Related Order</span>
              <strong>{flag.related_order === "-" ? "No linked order" : flag.related_order}</strong>
            </div>
            <div className="adm-flag-detail-item">
              <span className="adm-flag-detail-label">Created At</span>
              <strong>{flag.created_at}</strong>
            </div>
          </div>

          {accountProfile && (
            <div className="adm-flag-summary-card">
              <p className="adm-flag-summary-label">Linked Account Snapshot</p>
              <div className="adm-account-related-top">
                <div>
                  <p className="adm-account-related-title">{accountProfile.name}</p>
                  <p className="adm-account-inline-meta">{accountProfile.email}</p>
                </div>
                <span
                  className="adm-status-pill"
                  style={{
                    color: ACCOUNT_TRUST_META[accountProfile.trust_status].color,
                    background: ACCOUNT_TRUST_META[accountProfile.trust_status].bg,
                  }}
                >
                  {ACCOUNT_TRUST_META[accountProfile.trust_status].label}
                </span>
              </div>
              <p className="adm-flag-summary-text">{accountProfile.suggestion}</p>
              {onOpenAccount && (
                <button className="adm-link-btn" onClick={() => onOpenAccount(accountProfile.email, `Linked account for ${flag.id}`)}>
                  Open full account review
                </button>
              )}
            </div>
          )}

          <div className="adm-flag-summary-card">
            <p className="adm-flag-summary-label">Suggested Action</p>
            <p className="adm-flag-summary-text">{flag.suggested_action}</p>
          </div>

          <div className="adm-flag-timeline">
            <p className="adm-flag-summary-label">Short Activity Timeline</p>
            <div className="adm-flag-timeline-list">
              {flag.timeline.map((item, index) => (
                <div key={`${flag.id}-${index}`} className="adm-flag-timeline-item">
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
            onClick={() => onMarkReviewed(flag)}
            disabled={flag.status === "reviewed" || flag.status === "resolved"}
          >
            Mark as Reviewed
          </button>
          <button
            className="adm-ghost-btn adm-ghost-btn--violet"
            onClick={() => onEscalate(flag)}
            disabled={flag.status === "escalated" || flag.status === "resolved"}
          >
            Escalate
          </button>
          <button
            className="adm-primary-btn"
            onClick={() => onResolve(flag)}
            disabled={flag.status === "resolved"}
          >
            Resolve Flag
          </button>
        </div>
      </aside>
    </>
  );
}

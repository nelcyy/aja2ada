import { ACCOUNT_TRUST_META, SESSION_STATUS_META } from "../mockData";

export default function SecuritySection({
  securityState,
  devices,
  loginUsers,
  actionTemplates,
  onRequestAction,
  onTrustDevice,
  onOpenAccount,
  onRequireReverify,
  onForceLogout,
}) {
  const trustedCount = devices.filter((device) => device.status === "trusted").length;
  const newDeviceCount = devices.filter((device) => device.status === "new").length;
  const verificationOk = securityState.last_verification.status === "verified";

  const summaryCards = [
    {
      label: "Security Score",
      value: `${securityState.security_score}/100`,
      sub: "Frontend demo status based on 2FA, OTP checks, and device trust.",
      tone: "rose",
    },
    {
      label: "2FA Status",
      value: securityState.two_factor.enabled ? "Enabled" : "Disabled",
      sub: `${securityState.two_factor.method} active since ${securityState.two_factor.last_enabled}`,
      tone: "green",
    },
    {
      label: "Last Verification",
      value: verificationOk ? "Verified" : "Failed",
      sub: `${securityState.last_verification.method} - ${securityState.last_verification.time}`,
      tone: verificationOk ? "green" : "amber",
    },
    {
      label: "Device Trust",
      value: `${trustedCount} trusted`,
      sub: newDeviceCount > 0 ? `${newDeviceCount} device needs review` : "No new device warning right now",
      tone: newDeviceCount > 0 ? "amber" : "blue",
    },
  ];

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Admin Security</h2>
          <p className="adm-section-sub">Step-up verification and trusted device flow for frontend demo.</p>
        </div>
      </div>

      <div className="adm-security-grid">
        {summaryCards.map((card) => (
          <div key={card.label} className={`adm-security-card adm-security-card--${card.tone}`}>
            <p className="adm-security-card-label">{card.label}</p>
            <h3 className="adm-security-card-value">{card.value}</h3>
            <p className="adm-security-card-sub">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="adm-security-layout">
        <div className="adm-card adm-security-devices-card">
          <div className="adm-card-header">
            <div>
              <h3 className="adm-card-title">Trusted Devices</h3>
              <p className="adm-section-sub">Dummy device registry that can be connected to backend later.</p>
            </div>
          </div>

          <div className="adm-security-device-list">
            {devices.map((device) => (
              <div key={device.id} className={`adm-security-device-item adm-security-device-item--${device.status}`}>
                <div>
                  <div className="adm-security-device-top">
                    <strong>{device.name}</strong>
                    <span className={`adm-security-chip adm-security-chip--${device.status}`}>
                      {device.status === "trusted" ? "Trusted" : "New device"}
                    </span>
                  </div>
                  <p className="adm-security-device-meta">
                    {device.location} - {device.ip}
                  </p>
                  <p className="adm-security-device-meta">
                    Last active {device.last_active} - Trusted since {device.trusted_since}
                  </p>
                </div>

                {device.status === "new" && (
                  <button className="adm-ghost-btn" onClick={() => onTrustDevice(device.id)}>
                    Mark as Trusted
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="adm-security-side">
          <div className="adm-card adm-security-actions-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Sensitive Actions</h3>
                <p className="adm-section-sub">Every critical action can trigger the same reusable OTP modal.</p>
              </div>
            </div>

            <div className="adm-security-action-list">
              {actionTemplates.map((action) => (
                <div key={action.id} className="adm-security-action-item">
                  <div>
                    <p className="adm-security-action-title">{action.label}</p>
                    <p className="adm-security-action-desc">{action.description}</p>
                  </div>
                  <button className="adm-primary-btn" onClick={() => onRequestAction(action)}>
                    Trigger OTP
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={`adm-card adm-security-warning-card${securityState.new_device_warning ? " adm-security-warning-card--warn" : ""}`}>
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Device Warning</h3>
                <p className="adm-section-sub">Frontend alert card to show session and device trust state.</p>
              </div>
            </div>

            {securityState.new_device_warning ? (
              <div className="adm-security-warning-body">
                <p className="adm-security-warning-title">{securityState.new_device_warning.label}</p>
                <p className="adm-security-warning-desc">
                  First seen {securityState.new_device_warning.first_seen} from {securityState.new_device_warning.location}.
                </p>
                <p className="adm-security-warning-desc">
                  IP {securityState.new_device_warning.ip}
                </p>
              </div>
            ) : (
              <div className="adm-security-warning-body adm-security-warning-body--safe">
                <p className="adm-security-warning-title">No active warning</p>
                <p className="adm-security-warning-desc">
                  Semua device saat ini sudah dianggap aman untuk demo flow.
                </p>
              </div>
            )}

            <div className="adm-security-session-box">
              <p className="adm-security-session-title">Current Admin Session</p>
              <p className="adm-security-session-meta">{securityState.active_session.device}</p>
              <p className="adm-security-session-meta">{securityState.active_session.ip}</p>
              <p className="adm-security-session-meta">Last login {securityState.active_session.last_login}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="adm-card adm-security-logins-card">
        <div className="adm-card-header">
          <div>
            <h3 className="adm-card-title">Logged-in User Control</h3>
            <p className="adm-section-sub">Pantau semua user yang sedang login dan lihat apakah akunnya trusted atau perlu review.</p>
          </div>
        </div>

        <div className="adm-security-login-list">
          {loginUsers.map((user) => {
            const trustMeta = ACCOUNT_TRUST_META[user.trust_status];
            const sessionMeta = SESSION_STATUS_META[user.session_status];

            return (
              <div key={user.id} className={`adm-security-login-item adm-security-login-item--${user.trust_status}`}>
                <div className="adm-security-login-main">
                  <div className="adm-security-login-top">
                    <div>
                      <p className="adm-security-login-name">{user.name}</p>
                      <p className="adm-security-login-email">{user.email}</p>
                    </div>
                    <div className="adm-security-login-badges">
                      <span className="adm-status-pill" style={{ color: trustMeta.color, background: trustMeta.bg }}>
                        {trustMeta.label}
                      </span>
                      <span className="adm-status-pill" style={{ color: sessionMeta.color, background: sessionMeta.bg }}>
                        {sessionMeta.label}
                      </span>
                    </div>
                  </div>

                  <div className="adm-security-login-meta">
                    <span>{user.current_device}</span>
                    <span>{user.ip_address}</span>
                    <span>Last activity {user.last_activity}</span>
                  </div>

                  <div className="adm-security-login-meta adm-security-login-meta--compact">
                    <span>{user.failed_logins_24h} failed logins / 24h</span>
                    <span>{user.activity_snapshot.orders_24h} orders / 24h</span>
                    <span>{user.active_flag_ids.length} linked flags</span>
                  </div>

                  <p className="adm-security-login-suggestion">{user.suggestion}</p>
                </div>

                <div className="adm-security-login-actions">
                  <button className="adm-ghost-btn" onClick={() => onOpenAccount(user.email, "Live session review")}>
                    Inspect
                  </button>
                  <button
                    className="adm-ghost-btn adm-ghost-btn--violet"
                    onClick={() => onRequireReverify(user.id)}
                    disabled={user.session_status === "reverification" || user.session_status === "logged_out"}
                  >
                    Require Reverify
                  </button>
                  <button
                    className="adm-act-btn adm-act-btn--danger adm-act-btn--danger-text"
                    onClick={() => onForceLogout(user.id)}
                    disabled={user.session_status === "logged_out"}
                  >
                    Force Logout
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { FLAG_SEVERITY_META, FLAG_STATUS_META } from "../mockData";
import AuditLogTable from "./AuditLogTable";
import FlagDetailDrawer from "./FlagDetailDrawer";

export default function MonitoringSection({
  flags,
  auditLogs,
  accountProfiles,
  onOpenAccount,
  onMarkReviewed,
  onResolve,
  onEscalate,
}) {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedFlagId, setSelectedFlagId] = useState(null);

  const selectedFlag = flags.find((flag) => flag.id === selectedFlagId) || null;

  const filteredFlags = useMemo(() => {
    const lowered = query.toLowerCase();
    return flags.filter((flag) => {
      const matchSeverity = severityFilter === "all" || flag.severity === severityFilter;
      const matchStatus = statusFilter === "all" || flag.status === statusFilter;
      const matchQuery = !lowered
        || flag.id.toLowerCase().includes(lowered)
        || flag.rule_code.toLowerCase().includes(lowered)
        || flag.related_user.toLowerCase().includes(lowered)
        || flag.related_order.toLowerCase().includes(lowered)
        || flag.reason.toLowerCase().includes(lowered);
      return matchSeverity && matchStatus && matchQuery;
    });
  }, [flags, query, severityFilter, statusFilter]);

  const openFlags = flags.filter((flag) => flag.status === "open").length;
  const highSeverity = flags.filter((flag) => flag.severity === "high" && flag.status !== "resolved").length;
  const failedLogins = auditLogs.filter((log) => log.action_type === "login failed").length;
  const suspiciousItems = flags
    .filter((flag) => flag.status !== "resolved")
    .slice()
    .sort((left, right) => {
      const order = { high: 3, medium: 2, low: 1 };
      return order[right.severity] - order[left.severity];
    })
    .slice(0, 4);

  const summaryCards = [
    { label: "Total flagged cases", value: flags.length, tone: "rose" },
    { label: "Open flags", value: openFlags, tone: "amber" },
    { label: "High severity", value: highSeverity, tone: "violet" },
    { label: "Recent failed logins", value: failedLogins, tone: "blue" },
  ];

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Admin Monitoring</h2>
          <p className="adm-section-sub">Flag monitoring, suspicious activity review, and audit trail demo.</p>
        </div>
      </div>

      <div className="adm-monitor-grid">
        {summaryCards.map((card) => (
          <div key={card.label} className={`adm-security-card adm-security-card--${card.tone}`}>
            <p className="adm-security-card-label">{card.label}</p>
            <h3 className="adm-security-card-value">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="adm-monitor-layout">
        <div className="adm-monitor-main">
          <div className="adm-filter-row">
            <div className="adm-search-bar adm-monitor-search">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari flag, user, order, atau reason..."
                className="adm-search-input"
              />
              {query && <button className="adm-search-clear" onClick={() => setQuery("")}>x</button>}
            </div>

            <div className="adm-cat-pills">
              {["all", "high", "medium", "low"].map((severity) => (
                <button
                  key={severity}
                  className={`adm-cat-pill${severityFilter === severity ? " adm-cat-pill--active" : ""}`}
                  onClick={() => setSeverityFilter(severity)}
                >
                  {severity === "all" ? "All severity" : FLAG_SEVERITY_META[severity].label}
                </button>
              ))}
            </div>

            <div className="adm-cat-pills">
              {["all", "open", "reviewed", "escalated", "resolved"].map((status) => (
                <button
                  key={status}
                  className={`adm-cat-pill${statusFilter === status ? " adm-cat-pill--active" : ""}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" ? "All status" : FLAG_STATUS_META[status].label}
                </button>
              ))}
            </div>
          </div>

          <div className="adm-card adm-table-card">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Flag ID</th>
                  <th>Rule Code</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Related User</th>
                  <th>Related Order</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlags.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="adm-empty-row">No flags matched the current filters.</td>
                  </tr>
                ) : (
                  filteredFlags.map((flag) => {
                    const severityMeta = FLAG_SEVERITY_META[flag.severity];
                    const statusMeta = FLAG_STATUS_META[flag.status];
                    return (
                      <tr key={flag.id}>
                        <td><span className="adm-order-id">{flag.id}</span></td>
                        <td>{flag.rule_code}</td>
                        <td>
                          <span className="adm-status-pill" style={{ color: severityMeta.color, background: severityMeta.bg }}>
                            {severityMeta.label}
                          </span>
                        </td>
                        <td>
                          <span className="adm-status-pill" style={{ color: statusMeta.color, background: statusMeta.bg }}>
                            {statusMeta.label}
                          </span>
                        </td>
                        <td>{flag.related_user}</td>
                        <td>{flag.related_order}</td>
                        <td className="adm-date-cell">{flag.created_at}</td>
                        <td>
                          <button className="adm-act-btn adm-act-btn--edit" onClick={() => setSelectedFlagId(flag.id)}>
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="adm-monitor-side">
          <div className="adm-card adm-suspicious-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Suspicious Activity</h3>
                <p className="adm-section-sub">Open items that deserve a faster review.</p>
              </div>
            </div>

            <div className="adm-suspicious-list">
              {suspiciousItems.map((item) => {
                const severityMeta = FLAG_SEVERITY_META[item.severity];
                return (
                  <button
                    key={item.id}
                    className="adm-suspicious-item"
                    onClick={() => setSelectedFlagId(item.id)}
                  >
                    <div className="adm-suspicious-top">
                      <span className="adm-suspicious-id">{item.id}</span>
                      <span className="adm-status-pill" style={{ color: severityMeta.color, background: severityMeta.bg }}>
                        {severityMeta.label}
                      </span>
                    </div>
                    <p className="adm-suspicious-title">{item.reason}</p>
                    <p className="adm-suspicious-meta">{item.related_user} - {item.created_at}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AuditLogTable logs={auditLogs} />

      <FlagDetailDrawer
        open={Boolean(selectedFlag)}
        flag={selectedFlag}
        accountProfile={selectedFlag ? accountProfiles.find((account) => account.email === selectedFlag.related_user) : null}
        onOpenAccount={onOpenAccount}
        onClose={() => setSelectedFlagId(null)}
        onMarkReviewed={onMarkReviewed}
        onResolve={onResolve}
        onEscalate={onEscalate}
      />
    </div>
  );
}

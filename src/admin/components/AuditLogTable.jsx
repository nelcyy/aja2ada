import { AUDIT_RESULT_META } from "../mockData";

export default function AuditLogTable({ logs, title = "Recent Audit Logs", limit }) {
  const visibleLogs = typeof limit === "number" ? logs.slice(0, limit) : logs;

  return (
    <div className="adm-card adm-audit-card">
      <div className="adm-card-header">
        <div>
          <h3 className="adm-card-title">{title}</h3>
          <p className="adm-section-sub">Frontend-only demo logs for admin actions and monitoring events.</p>
        </div>
      </div>

      <div className="adm-audit-table-wrap">
        <table className="adm-table adm-audit-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Actor</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {visibleLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="adm-empty-row">Belum ada audit log.</td>
              </tr>
            ) : (
              visibleLogs.map((log) => {
                const meta = AUDIT_RESULT_META[log.result_status] || AUDIT_RESULT_META.warning;
                return (
                  <tr key={log.id}>
                    <td>
                      <div className="adm-audit-action">
                        <span className="adm-audit-action-text">{log.action_type}</span>
                        <span className="adm-audit-id">{log.id}</span>
                      </div>
                    </td>
                    <td>{log.actor}</td>
                    <td className="adm-date-cell">{log.timestamp}</td>
                    <td>
                      <span className="adm-status-pill" style={{ color: meta.color, background: meta.bg }}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="adm-audit-ip">{log.ip_address}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

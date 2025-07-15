// src/components/NetworkStatus.jsx
import { useEffect, useState } from "react";

function NetworkStatus() {
  const [networkType, setNetworkType] = useState("unknown");
  const [effectiveType, setEffectiveType] = useState("unknown");

  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      setNetworkType(connection.type || "unknown");
      setEffectiveType(connection.effectiveType || "unknown");

      const updateConnectionStatus = () => {
        setNetworkType(connection.type || "unknown");
        setEffectiveType(connection.effectiveType || "unknown");
      };

      connection.addEventListener("change", updateConnectionStatus);

      return () => {
        connection.removeEventListener("change", updateConnectionStatus);
      };
    }
  }, []);

  return (
    <div className="alert alert-info mt-3">
      <h6 className="mb-1"> Network Information</h6>

      <p className="mb-0">
        <strong>Type:</strong> {networkType} <br />
        <strong>Effective Type:</strong> {effectiveType}
      </p>

      {(effectiveType === "slow-2g" || effectiveType === "2g") && (
        <p className="text-danger mt-2">
           Your connection is slow. Some features may not work smoothly.
        </p>
      )}

      {(networkType === "unknown" && effectiveType === "unknown") && (
        <p className="text-muted mt-2">
           Network details are not available in this browser. Try using Chrome on Android for full support.
        </p>
      )}
    </div>
  );
}

export default NetworkStatus;

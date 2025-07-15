// src/components/LocationTracker.jsx
import { useEffect, useState } from "react";

function LocationTracker() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        setErrorMsg("Permission denied or location unavailable.",error);
      }
    );
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">📍 Your Current Location</h5>
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
        {location ? (
          <p>
            <strong>Latitude:</strong> {location.latitude} <br />
            <strong>Longitude:</strong> {location.longitude}
          </p>
        ) : (
          !errorMsg && <p>Fetching your location...</p>
        )}
      </div>
    </div>
  );
}

export default LocationTracker;

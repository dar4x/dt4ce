import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countryData from "../assets/geo.json";
import "./Map.scss";

const Map: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.LayerGroup>(L.layerGroup());

  useEffect(() => {
    const initialMap = L.map("map").setView([41.4781, 74.6062], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(initialMap);

    L.geoJSON(countryData).addTo(initialMap);

    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (map) {
      markers.addTo(map);

      map.on("click", function (e) {
        if (isInsideKyrgyzstan(e.latlng)) {
          L.marker(e.latlng).addTo(markers);
        } else {
          alert("Нельзя оставлять метку за пределами Кыргызстана.");
        }
      });
    }
  }, [map, markers]);

  // Проверка, находится ли точка внутри границ Кыргызстана
  function isInsideKyrgyzstan(latlng: L.LatLng) {
    const kyrgyzstanBounds = L.geoJSON(countryData).getBounds();
    return kyrgyzstanBounds.contains(latlng);
  }

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default Map;

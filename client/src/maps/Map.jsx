import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MyMarker from "./MyMarker"
import { MapProvider } from "react-leaflet/core"

const Map = () => {
  const position = [31.7767, 35.2345] // ברירת מחדל: ירושלים

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapProvider>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MyMarker pos={position} x="מיקום נוכחי" />
        </MapContainer>
      </MapProvider>
    </div>
  )
}

export default Map

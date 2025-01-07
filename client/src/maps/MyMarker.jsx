import React, { useEffect } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"

// תיקון לאייקונים של Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const MyMarker = ({ pos, x }) => {
  const map = useMap()

  useEffect(() => {
    if (map) {
      map.setView(pos, map.getZoom())
    }
  }, [map, pos])

  return (
    <Marker position={pos}>
      <Popup>{x}</Popup>
    </Marker>
  )
}

export default MyMarker

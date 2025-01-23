import React from "react"
import { Box } from "@mui/material"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const InteractiveMap = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  }

  const defaultCenter = {
    lat: 32.0853, // Your location coordinates
    lng: 34.7818,
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Box sx={{ mt: 4 }}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </Box>
    </LoadScript>
  )
}

export default InteractiveMap

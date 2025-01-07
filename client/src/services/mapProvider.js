const mapProvider = {
  search: async ({ query }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=il`
      )
      const data = await response.json()

      if (!data.length) return []

      return data.map((item) => ({
        x: parseFloat(item.lon),
        y: parseFloat(item.lat),
        label: item.display_name,
      }))
    } catch (error) {
      console.error("Error in mapProvider search:", error)
      return []
    }
  },
}

export default mapProvider

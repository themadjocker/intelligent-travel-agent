export async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch("/api/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: query }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.warn(`Geocoding failed for query: ${query}`, errorData)
      return null
    }

    const data = await response.json()
    return { lat: data.latitude, lng: data.longitude }
  } catch (error) {
    console.error("Error during geocoding:", error)
    return null
  }
}

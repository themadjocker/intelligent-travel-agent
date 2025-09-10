import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { location } = await request.json()

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const apiKey = process.env.OPENCAGE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Geocoding service not configured" }, { status: 500 })
    }

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}&limit=1`,
    )

    if (!response.ok) {
      throw new Error("Geocoding request failed")
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const result = data.results[0]
      return NextResponse.json({
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        formatted: result.formatted,
      })
    } else {
      return NextResponse.json({ error: "Location not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Geocoding error:", error)
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 })
  }
}

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"

interface GeoFeature {
  type: string
  geometry: any
  properties: any
}

function interpolateProjection(raw0: any, raw1: any) {
  const mutate: any = d3.geoProjectionMutator((t: number) => (x: number, y: number) => {
    const [x0, y0] = raw0(x, y)
    const [x1, y1] = raw1(x, y)
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)]
  })
  let t = 0
  return Object.assign((mutate as any)(t), {
    alpha(_: number) {
      return arguments.length ? (mutate as any)((t = +_)) : t
    },
  })
}

export function GlobeMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [progress] = useState([0])
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const [rotation, setRotation] = useState([0, 0])
  const [translation] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState([0, 0])

  const width = 400
  const height = 300

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const world: any = await response.json()
        const countries = (feature(world, world.objects.countries) as any).features
        setWorldData(countries)
      } catch (error) {
        const fallbackData = [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
              ],
            },
            properties: {},
          },
        ]
        setWorldData(fallbackData)
      }
    }

    loadWorldData()
  }, [])

  useEffect(() => {
    const autoRotate = setInterval(() => {
      if (!isDragging) {
        setRotation((prev) => [(prev[0] + 0.3) % 360, prev[1]])
      }
    }, 50)

    return () => clearInterval(autoRotate)
  }, [isDragging])

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect) {
      setLastMouse([event.clientX - rect.left, event.clientY - rect.top])
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return

    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    const currentMouse = [event.clientX - rect.left, event.clientY - rect.top]
    const dx = currentMouse[0] - lastMouse[0]
    const dy = currentMouse[1] - lastMouse[1]

    const sensitivity = 0.5
    setRotation((prev) => [prev[0] + dx * sensitivity, Math.max(-90, Math.min(90, prev[1] - dy * sensitivity))])

    setLastMouse(currentMouse)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const t = progress[0] / 100
    const alpha = Math.pow(t, 0.5)

    const scale = d3.scaleLinear().domain([0, 1]).range([120, 80])

    const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
      .scale(scale(alpha))
      .translate([width / 2 + translation[0], height / 2 + translation[1]])
      .rotate([rotation[0], rotation[1]])
      .precision(0.1)

    projection.alpha(alpha)

    const path = d3.geoPath(projection)

    try {
      const graticule = d3.geoGraticule()
      const graticulePath = path(graticule())
      if (graticulePath) {
        svg
          .append("path")
          .datum(graticule())
          .attr("d", graticulePath)
          .attr("fill", "none")
          .attr("stroke", "#4a5568")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3)
      }
    } catch (error) {}

    svg
      .selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => {
        try {
          const pathString = path(d as any)
          if (!pathString) return ""
          if (typeof pathString === "string" && (pathString.includes("NaN") || pathString.includes("Infinity"))) {
            return ""
          }
          return pathString
        } catch (error) {
          return ""
        }
      })
      .attr("fill", (d: any) => {
        const isBrazil = d.properties?.name === "Brazil" || d.properties?.iso_a3 === "BRA"
        return isBrazil ? "#22c55e" : "none"
      })
      .attr("stroke", "#6b7280")
      .attr("stroke-width", 0.5)
      .attr("opacity", (d: any) => {
        const isBrazil = d.properties?.name === "Brazil" || d.properties?.iso_a3 === "BRA"
        return isBrazil ? 0.7 : 1.0
      })
      .style("visibility", function () {
        const pathData = d3.select(this).attr("d")
        return pathData && pathData.length > 0 && !pathData.includes("NaN") ? "visible" : "hidden"
      })

    try {
      const sphereOutline = path({ type: "Sphere" })
      if (sphereOutline) {
        svg
          .append("path")
          .datum({ type: "Sphere" })
          .attr("d", sphereOutline)
          .attr("fill", "none")
          .attr("stroke", "#374151")
          .attr("stroke-width", 1.5)
          .attr("opacity", 0.8)
      }
    } catch (error) {}

  }, [worldData, progress, rotation, translation])

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-w-xs cursor-grab active:cursor-grabbing"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}

export default GlobeMap
const minBy = require('lodash').minBy
const maxBy = require('lodash').maxBy

function locToPx(lat, lon, width, height, points) {
  function mercatorY(lat) {
    return Math.log(Math.tan(lat / 2 + Math.PI / 4))
  }

  lat = parseFloat(lat)
  lon = parseFloat(lon)
  const north = parseFloat(maxBy(points, v => v.latitude).latitude)
  const south = parseFloat(minBy(points, v => v.latitude).latitude)
  const east = parseFloat(maxBy(points, v => v.longitude).longitude)
  const west = parseFloat(minBy(points, v => v.longitude).longitude)
  const yMin = mercatorY(south)
  const yMax = mercatorY(north)
  const xFactor = width / (east - west)
  const yFactor = height / (yMax - yMin)
  const x = (lon - west) * xFactor
  const y = (yMax - mercatorY(lat)) * yFactor
  return { x, y }
}

module.exports = function(workouts, mapWidth, mapHeight) {
  // Transform workouts data
  return workouts.map(val => {
    let seen = []
    const locationPoints = val.Location.map(l => l.$)
    return locationPoints.reduce((acc, pos) => {
      const point = locToPx(
        pos.latitude,
        pos.longitude,
        mapWidth,
        mapHeight,
        locationPoints
      )

      const pointStr = `${point.x},${point.y}`
      if (seen.includes(pointStr) == false) {
        seen.push(pointStr)
        acc.push({
          x: point.x,
          y: point.y
        })
      }
      return acc
    }, [])
  })
}

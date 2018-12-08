const strToJson = require('xml2js').parseString
const xmlParser = require('libxmljs')
const fs = require('fs')
const plotWorkouts = require('./plotWorkouts')

let xmlDoc = xmlParser.parseXmlString(fs.readFileSync('_raw/export.xml'))
let workoutsArray = []
let jsonData

// Pull WorkoutRoutes from XML before converting to JSON.
// This helps sidestep out of memory errors when parsing the entire doc w/ `xml2js`
xmlDoc.find('//WorkoutRoute').forEach(async (node) => {
  await strToJson(node.toString(), (err, res) => workoutsArray.push(res.WorkoutRoute))
})

// Plot data by transforming lat/lon to x/y coords (given a map size)
jsonData = plotWorkouts(workoutsArray, 256, 256)

// Write JSON to file for serving from the Nuxt application
fs.writeFileSync('_processed/routeData.json', JSON.stringify(jsonData))

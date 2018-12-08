# healthkit-workout-routes

> Provide an Apple HealthKit XML export and the magic within will help you parse out GPS routes, spin up a small Vue.js + Nuxt.js application, and serve up your routes plotted on HTML5 canvas elements. Have fun!

## Privacy

None of the included code will _ever_ upload your HealthKit or GPS data to any location. **Please open an issue on GitHub** if you feel that some element of this project may compromise a users security!

## Requirements

* Node 8.x LTS
* `yarn` (you can install `yarn` with: `npm i -g yarn`)

## Setup

* run `yarn install`
* import HealthKit data — see below
* run `yarn process` to pull HealthKit data apart and generate the JSON needed by Nuxt.js application
* run `yarn dev` & open `http://localhost:3000` in your browser

## Importing HealthKit data

* Export your Apple HealthKit data (instructions for iOS 12):
    1. Open the Health app on your iPhone
    2. Select Health Data at the bottom of the screen
    3. Select the portrait icon in the top right
    4. Press Export Health Data, and confirm the export.
       * It may take some time to export.
    5. Email or AirDrop it to yourself, and continue below.
* Extract your HealthKit data export from the `.zip` archive.
* Copy the `export.xml` file to the `~/_raw` folder at the root of this repository. Do not rename the file.

## More information

* Feel free to direct questions to the issues section or hit me up on Twitter [@aaronransley](http://twitter.com/aaronransley) 👋

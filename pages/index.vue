<template lang='pug'>
section
  main
    .workout(
      v-for='(route, i) in routes'
      :style='routeStyle(i)'
      data-aos='slide-up'
      data-aos-duration='500'
    )
      canvas.workout--inner(width='256' height='256' :data-workout-index='i' ref='canvas')
  footer
    img(v-lazy='"https://media.tenor.com/images/e8e4f4dea816af59642ee677120ca0bc/tenor.gif"')
    h2 the end
    p 👋
</template>

<script>
import 'aos/dist/aos.css'
import { shuffle, forEach } from 'lodash'

export default {
  data() {
    return {
      routes: []
    }
  },
  asyncData() {
    // Randomize order of dem routes 🎲
    return {
      routes: shuffle(require('~/_processed/routeData.json'))
    }
  },
  mounted() {
    this.addAOS()
    this.drawCanvases()
  },
  methods: {
    routeStyle(i) {
      return {
        // Delay each route by a random amount for more FLAIR 🔥
        transitionDelay: `${Math.random() * 200}ms`
      }
    },

    // Coolio smoothy viewport-aware transitions
    addAOS() {
      import('aos').then(AOS =>
        AOS.init({
          once: true
        })
      )
    },

    // Draw a semi-randomly sized dot for each location in a GPS route
    drawCanvases() {
      forEach(this.routes, (route, index) => {
        const canvas = this.$refs.canvas.find(
          c => c.getAttribute('data-workout-index') == index
        )
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#242424'

        forEach(route, loc => {
          const size = 15 + Math.random() * 5
          ctx.beginPath()
          ctx.arc(
            Math.min(Math.max(loc.x, 20), 236),
            Math.min(Math.max(loc.y, 20), 236),
            size,
            size,
            0,
            360,
            0
          )
          ctx.fill()
        })
      })
    }
  }
}
</script>

<style lang='scss'>
main {
  padding: 7.5vh 0;
  margin: 0 auto 40px auto;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.workout {
  width: 256px;
  height: 256px;
  background-color: #f2d0f9;
  border-radius: 100%;
  margin: 35px 15px;
  overflow: hidden;
}

.workout--inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: scale(0.5);
}

footer {
  width: 80%;
  max-width: 750px;
  margin: 20px auto;
  font-family: Tahoma, sans-serif;
  text-align: center;
  padding-bottom: 100px;
  margin-bottom: 0;

  @media screen and (min-width: 475px) {
    margin-top: 60px;
  }

  h2 {
    margin: 1em 0 0.25em 0;
    font-size: 24px;

    color: #9cdcfe;

    @media screen and (min-width: 475px) {
      font-size: 34px;
    }
  }

  p {
    font-size: 24px;
    margin-bottom: 0;
  }
}
</style>

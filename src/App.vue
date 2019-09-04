<template>
  <div id="app">
    <div id="nav">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </div>
    <router-view/>
  </div>
</template>

<script>
// import CoursesTable from './components/CoursesTable.vue'
import MyNavBar from './components/MyNavBar.vue'

export default {
  components: {
    MyNavBar
  },
  data() {
    return {
      x: 0,
      y: 0,
      seasonBackgroundColors: {
        winter: 'winter-background-color',
        fall: 'fall-background-color'
      },
      seasonBackgroundImages: {
        winter: 'winter-background-image',
        fall: 'fall-background-color'
      }
    }
  },
  methods: {
  }
}
</script>

<style>

html {
  overflow: scroll;
}

tr {
}

.footer__navigation__page-info__current-entry {
  color: black !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 1000px;
  background: url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed; 
}

.winter-background-color {
  background-image: linear-gradient(to right top, #05a2c8, #08a9d1, #0bb0d9, #0fb7e2, #12beeb) !important;
}

.winter-table-color {
  background: lightblue;
}

.summer-table-color {
  background: orange;
}

.spring-table-color {
  background: pink;
}

.summer1-table-color {
  background: blue;
}

.summer2-table-color {
  background: blue;
}


.vgt-wrap__footer {
  border: none !important;
}

.vgt-wrap__footer * {
  /*color: white !important;*/
  font-weight: 600;
}

.footer__navigation__page-info {
  color: white !important
}

.footer__navigation__page-btn {
  color: white !important;
} 

.footer__row-count__label {
  color: white !important;
}

.footer__row-count__select {
  color: white !important;
}

table {
  border: none;
}

td {
    color: white !important;
    /*border: solid darkgreen;*/
}

th {
  color: white !important;
  background: transparent !important;
}

.solid-orange {
  border: solid orange;
}

.solid-light-blue {
  /*border: solid lightblue;*/
}


.my-opacity {
  opacity: 0.95;
}

.red {
  color: HSL(370, 65%, 55%);
}

.orange {
  color: orange;
  color: HSL(400, 50%, 50%);
}
.green {
  color: green;
}

.my-blue {
  color: #167df0;
}

</style>

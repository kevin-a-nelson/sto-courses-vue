<template>
  <div id="app" class="fall-background-image">
    <div id="nav">
      <my-nav-bar />
      <!-- <router-link to="/signup">Signup</router-link> | -->
      <!-- <router-link to="/login">Login</router-link> | -->
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
  created() {
  },
  mounted() {
    var paginationFooter = document.getElementsByClassName('vgt-wrap__footer')[0]
    paginationFooter.classList.add('fall-background-color')
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
    },
    changeElementSeason(inputSeason, element) {
      var seasonBackgrounds = ['winter-background-color', 'fall-background-color']
      seasonBackgrounds.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(this.seasonBackgroundColors[inputSeason])
    },
    changeElementSeasonImage(inputSeason, element) {
      var seasonBackgrounds = ['winter-background-image', 'fall-background-image']
      seasonBackgrounds.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(this.seasonBackgroundImages[inputSeason])
    }
  },
}
</script>

<style>

html {
  overflow: scroll;
}

tr {
  /*border: solid lightgreen;*/
  border: linear-gradient(315deg, #00cc00 0%, #339933 60%);
}

.spring-background-color {
  background-image: linear-gradient(200deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%) !important;
}

.spring-background-image {
  background: url(https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2019/03/5c949b2d45ead_5c949a57947db_1937238489.jpg) no-repeat center center fixed; 
  /*background: url(https://ak8.picdn.net/shutterstock/videos/14673928/thumb/1.jpg) no-repeat center center fixed; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;  
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
/*  background: url(https://images4.alphacoders.com/106/thumb-1920-106826.jpg) fixed;
  background: url(https://wallpaperaccess.com/full/202978.jpg) fixed;*/
  /*background: url(https://wallpapercave.com/wp/nCJZmyI.jpg) fixed;*/
  /*background: url(https://wallpaperplay.com/walls/full/a/4/1/191258.jpg) fixed;*/
/*  background: url(http://getwallpapers.com/wallpaper/full/6/5/d/560817.jpg) fixed;
  background: url(https://wallpapercave.com/wp/wp4078020.jpg) fixed;
  background: url(https://i.pinimg.com/originals/cb/5d/c5/cb5dc599b22b6854496d53b4ab8133a3.jpg) fixed;*/

/*  background: url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed; 
  background: url(http://hdwpro.com/wp-content/uploads/2017/10/Awesome-Fall-Wallpaper.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;*/

  min-height: 1000px;
}



.winter-background-image {
  background: url(https://wallpaperbro.com/img/352195.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;  
}

.fall-background-image {
  background: url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed; 
  /*background: url(http://hdwpro.com/wp-content/uploads/2017/10/Awesome-Fall-Wallpaper.jpg) no-repeat center center fixed; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.fall-background-color {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%) !important;
  background-color: #00b712;
}

.winter-background-color {
  background-color: #abe9cd;
  background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%) !important;
}


.vgt-wrap__footer {
  border: none !important;
}

.vgt-wrap__footer * {
  color: white !important;
  font-weight: 600;
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
  opacity: 0.9;
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

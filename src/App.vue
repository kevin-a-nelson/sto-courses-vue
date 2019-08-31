<template>
  <div id="app">
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
    }
  },
  methods: {
    methodToRunOnSelect(payload) {
      console.log(payload)
      this.object = payload;
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: url(https://images4.alphacoders.com/106/thumb-1920-106826.jpg) fixed;
  background: url(https://wallpaperaccess.com/full/202978.jpg) fixed;
  /*background: url(https://wallpapercave.com/wp/nCJZmyI.jpg) fixed;*/
  /*background: url(https://wallpaperplay.com/walls/full/a/4/1/191258.jpg) fixed;*/
  background: url(http://getwallpapers.com/wallpaper/full/6/5/d/560817.jpg) fixed;
  background: url(https://wallpapercave.com/wp/wp4078020.jpg) fixed;
  min-height: 1000px;
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

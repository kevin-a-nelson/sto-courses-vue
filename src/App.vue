<template>
  <div id="app">
    <div id="nav">
<!--       <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> | -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import CoursesTable from './components/CoursesTable.vue'

export default {
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
}

#nav {
  /*padding: 10px;*/
  /*background: green;*/
  /*float: right;*/
  text-align: right;
  width :100%;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}

</style>

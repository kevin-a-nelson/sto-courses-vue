<template>
  <div id="app">
    <div id="nav">
<!--       <router-link to="/stolaf/20191">Stolaf</router-link> |
      <router-link to="/me/20191/1">Me</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import CoursesTable from './components/CoursesTable.vue'

export default {
  data() {
    return {
      test: 'this is global'
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
  /*background: navy;*/
}

.vgt-table{ 
  overflow-y: auto; height: 100px; 
}
.vgt-table th { 
  position: sticky; top: 0; 
}


/*#nav {
  padding: 30px;
}*/

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: white;
}

</style>

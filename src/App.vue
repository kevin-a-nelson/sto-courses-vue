<template>
  <div id="app">
    <div id="nav">
      <!-- <b-table :data="data" :columns="columns"></b-table> -->
<!--       <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect"></dropdown>
      <dropdown :options="arrayOfObjects2" :selected="object2" v-on:updateOption="methodToRunOnSelect"></dropdown> -->
      <!-- <router-link to="/signup">Signup</router-link> | -->
      <!-- <router-link to="/login">Login</router-link> | -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import CoursesTable from './components/CoursesTable.vue'

export default {
  data() {
    return {
      test: 'this is global',
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      data: [
          { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
          { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
          { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
          { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
          { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
      ],
      columns: [
          {
              field: 'id',
              label: 'ID',
              width: '40',
              numeric: true
          },
          {
              field: 'first_name',
              label: 'First Name',
          },
          {
              field: 'last_name',
              label: 'Last Name',
          },
          {
              field: 'date',
              label: 'Date',
              centered: true
          },
          {
              field: 'gender',
              label: 'Gender',
          }
      ],
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

/*#nav {
  padding: 30px;
}*/

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}

</style>

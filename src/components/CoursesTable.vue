<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"    
    />
    <button v-on:click="getStolafCourses()"></button>
  </div>
</template>

<script>
import axios from 'axios'
import CoursesTableColumns from './CoursesTableColumns.js'


  export default {
    name: 'courses-table',
    data() {
      return {
        columns: CoursesTableColumns,
        rows: [
          { id:1, name: 'John' }
        ]
      }
    },
    methods: {
      getStolafCourses() {
        axios.get(`api/courses?term=20191&type=class`).then(response => {
          console.log(response.data.courses)
        })
      }
    }
  }
</script>


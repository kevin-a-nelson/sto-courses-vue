<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"    
    />
    <button v-on:click="getStolafTermCourses()"></button>
  </div>
</template>

<script>
import axios from 'axios'
import CoursesTableColumns from './CoursesTableColumns.js'


  export default {
    name: 'courses-table',
    data() {
      return {
        year: 2019,
        semester: 1,
        courseType: 'class',
        columns: CoursesTableColumns,
        rows: []
      }
    },
    methods: {
      getStolafTermCourses() {
        axios.get(`api/courses?term=${this.year}${this.semester}&type=${this.courseType}`).then(response => {
          this.rows = response.data.courses 
        })
      }
    }
  }
</script>


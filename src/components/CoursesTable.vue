<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field === 'actions'">
          <button>View</button>
          <button>Add</button>
          <button>Remove</button>
        </div>
        <span v-else> {{ props.formattedRow[props.column.field] }} </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import axios from 'axios'
import CoursesTableColumns from './CoursesTableColumns.js'

export default {
  name: 'courses-table',
  created() {
    this.getStolafTermCourses()
  },
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


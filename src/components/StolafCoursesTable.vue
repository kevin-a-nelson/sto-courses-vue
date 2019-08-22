<template>
  <div id="stolaf-courses-table">
    <router-link :to="{ path: `${this.url()}` }">See My Courses</router-link>
    <div>
      <div>
        <form>
          <select v-model="year" v-on:change="getStolafTermCourses()">
            <option v-for="year in years">
              {{ year }}
            </option>
          </select>
        </form>
      </div>
      <div>
        <form>
          <select v-model="semester" v-on:change="getStolafTermCourses()">
            <option v-for="semester in semesters" v-bind:value="semester.value">
              {{ semester.text }}
            </option>
          </select>
        </form>
      </div>
      <div>
        <form>
          <select v-model="courseType" v-on:change="getStolafTermCourses()">
            <option v-for="type in courseTypes" v-bind:value="type.value">
              {{ type.text }}
            </option>
          </select>
        </form>
      </div>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered">
      >
      <template slot="table-row" slot-scope="props">
        <!-- Action Column -->
        <div v-if="props.column.field == 'actions'">
          <button>View</button>
          <button v-on:click="addCourse(props.row.id)">Add</button>
        </div>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <template slot="table-column" slot-scope="props" style="width: 10px">
         <span style="width: 10px" v-if="props.column.label =='Name'">
            {{props.column.label}}
         </span>
         <span v-else>
            {{props.column.label}}
         </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import axios from 'axios'
import columns from './Columns.js'
import ActionButtons from './ActionButtons.vue'
import courseTypes from './dropDownItems/CourseTypes.js'

export default {
  name: 'stolaf-courses-table',
  components: {
    ActionButtons
  },
  created() {
    console.log(Number(this.$route.query.draft))
    this.getStolafTermCourses()
  },
  data() {
    return {
      year: Number(this.$route.query.year) || 2019,
      semester: Number(this.$route.query.semester) || 1,
      draftNum: Number(this.$route.query.draft) || 1,
      courseType: this.$route.query.type || 'class',
      columns: columns,
      rows: [],
      courseTypes: courseTypes,
      years: ['2019', '2018', '2017', '2016', '2015'],
      semesters: [
        { text: 'Fall', value: 1 },
        { text: 'Interim', value: 2 },
        { text: 'Spring', value: 3 },
        { text: 'Summer Session 1', value: 4 },
        { text: 'Summer Session 2', value: 5 },
      ]
    }
  },
  methods: {
    url() {
      console.log('running')
      return `me/?year=${this.year}&semester=${this.semester}&draft=${this.draftNum}&type=${this.courseType}`
    },
    getStolafTermCourses() {
      this.rows = []
      axios.get(`api/courses?term=${this.year}${this.semester}&type=${this.courseType}`).then(response => {
        this.rows = response.data.courses 
      })
    },
    addCourse(course_id) {
      axios.post(`api/course_terms?term=${this.year}${this.semester}&order=${this.draftNum}&course_id=${course_id}`)
    },
  }
}
</script>

<style>

vue-good-table {
  font-size: 5px;
  background: blue;
}
  
</style>


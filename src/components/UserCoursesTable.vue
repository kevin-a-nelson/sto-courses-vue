<template>
  <div>
    <router-link :to="{path: `${this.url1()}`}" >See Stolaf Courses</router-link>
    <div>
      <form>
        <select v-model="year" v-on:change="getUserTermCourses()">
          <option v-for="year in years">
            {{ year }}
          </option>
        </select>
      </form>
    </div>
    <div>
      <form>
        <select v-model="semester" v-on:change="getUserTermCourses()">
          <option v-for="semester in semesters" v-bind:value="semester.value">
            {{ semester.text }}
          </option>
        </select>
      </form>
    </div>
    <div>
      <form>
        <select v-model="draftNum" v-on:change="getUserTermCourses()">
          <option v-for="draft in drafts" v-bind:value="draft.value">
            {{ draft.text }}
          </option>
        </select>
      </form>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'">
          <button>View</button>
          <button v-on:click="removeCourse(props.row.id)">Remove</button>
        </div>
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
  name: 'user-courses-table',
  components: {
    ActionButtons
  },
  created() {
    this.getUserTermCourses()
  },
  data() {
    return {
      year: Number(this.$route.query.year) || 2019,
      semester: Number(this.$route.query.semester) || 1,
      draftNum: Number(this.$route.query.draft) || 1,
      selectedCourseType: this.$route.query.type || 'class',
      columns: columns,
      rows: [],
      draftNums: [1, 2, 3, 4, 5],
      years: ['2019', '2018', '2017', '2016', '2015'],
      semesters: [
        { text: 'Fall', value: 1 },
        { text: 'Interim', value: 2 },
        { text: 'Spring', value: 3 },
        { text: 'Summer Session 1', value: 4 },
        { text: 'Summer Session 2', value: 5 },
      ],
      drafts: [
        { text: 'Draft 1', value: 1 },
        { text: 'Draft 2', value: 2 },
        { text: 'Draft 3', value: 3 },
        { text: 'Draft 4', value: 4 },
        { text: 'Draft 5', value: 5 },
      ]
    }
  },
  methods: {
    url1() {
      return `/?year=${this.year}&semester=${this.semester}&draft=${this.draftNum}&type=${this.selectedCourseType}`
    },
    getUserTermCourses() {
      axios.get(`api/terms?term=${this.year}${this.semester}&order=${this.draftNum}`).then(response => {
        this.rows = response.data[0].courses
      })
    },
    removeCourse(course_id) {
      axios.delete(`api/course_terms?term=${this.year}${this.semester}&order=${this.draftNum}&course_id=${course_id}`).then(response => {
        this.getUserTermCourses()
      })
    }
  }
}
</script>


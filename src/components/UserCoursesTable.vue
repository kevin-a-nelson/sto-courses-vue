<template>
  <div>
    <router-link :to="{path: `/stolaf/${this.year}/${this.semester}/${this.draftNum}/class` }">See User Courses</router-link>
    <div>
      <button v-on:click="test()">Test</button>
      <h1>{{ this.year }} {{ this.semester }} </h1>
      <button v-on:click="changeSemester(-1)">Prev</button>
      <button v-on:click="changeSemester(1)">Next</button>
    </div>
    <div>
      <span>Draft: </span>
      <form>
        <select v-model="draftNum" v-on:change="getUserTermCourses()">
          <option v-for="draftNum in draftNums">{{ draftNum }}</option>
        </select>
      </form>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'">
          <button>View</button>
          <button>Remove</button>
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
      year: Number(this.$route.params.year) || 2019,
      semester: Number(this.$route.params.semester) || 1,
      draftNum: Number(this.$route.params.draftNum) || 1,
      selectedCourseType: 'class',
      columns: columns,
      rows: [],
      draftNums: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    getUserTermCourses() {
      axios.get(`api/terms?term=${this.year}${this.semester}&order=${this.draftNum}`).then(response => {
        this.rows = response.data[0].courses
      })
    },
    changeSemester(change) {
      this.semester += change
    },
    test() {
      console.log('hello')
    },
  }
}
</script>


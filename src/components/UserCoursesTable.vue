<template>
  <div>
    <div>
      <h1>{{ this.year }} {{ this.semester }} </h1>
      <button>Prev</button>
      <button>Next</button>
    </div>
    <div>
      <p>Draft: </p>
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
      year: 2019,
      semester: 1,
      selectedCourseType: 'class',
      columns: columns,
      rows: [],
      draftNums: [1, 2, 3, 4, 5],
      draftNum: 1,
    }
  },
  methods: {
    getUserTermCourses() {
      axios.get(`api/terms?term=${this.year}${this.semester}&order=${this.draftNum}`).then(response => {
        this.rows = response.data[0].courses 
      })
    },
  }
}
</script>


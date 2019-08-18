<template>
  <div>
    <div>
      <form>
        <select v-model="selectedCourseType">
          <option v-for="type in courseTypes" v-bind:value="type.value">
            {{ type.text }}
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
          <button>Add</button>
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
  name: 'courses-table',
  components: {
    ActionButtons
  },
  created() {
    this.getStolafTermCourses()
  },
  data() {
    return {
      year: 2019,
      semester: 1,
      selectedCourseType: 'class',
      columns: columns,
      rows: [],
      courseTypes: courseTypes
    }
  },
  methods: {
    getStolafTermCourses() {
      axios.get(`api/courses?term=${this.year}${this.semester}&type=${this.selectedCourseType}`).then(response => {
        this.rows = response.data.courses 
      })
    }
  }
}
</script>


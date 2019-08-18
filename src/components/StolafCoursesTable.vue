<template>
  <div>
    <router-link :to="{path: `/me/${this.year}/${this.semester}/${this.draftNum}/class` }">See User Courses</router-link>
    <div>
      <h1>{{ this.year }} {{ this.semester }} </h1>
      <button>Prev</button>
      <button>Next</button>
    <button v-on:click="test()">test</button>
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
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'">
          <button>View</button>
          <button>Add</button>
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
  name: 'stolaf-courses-table',
  components: {
    ActionButtons
  },
  created() {
    this.getStolafTermCourses()
  },
  data() {
    return {
      year: Number(this.$route.params.year) || 2019,
      semester: Number(this.$route.params.semester) || 1,
      draftNum: Number(this.$route.params.draftNum) || 1,
      courseType: Number(this.$route.params.courseType) || 'class',
      columns: columns,
      rows: [],
      courseTypes: courseTypes
    }
  },
  methods: {
    getStolafTermCourses() {
      `me/${this.year}/${this.semester}/${this.draftNum}/${this.courseType}`
      axios.get(`api/courses?term=${this.year}${this.semester}&type=${this.selectedCourseType}`).then(response => {
        this.rows = response.data.courses 
      })
    },
    test() {
      console.log(this.$route.params.draftNum)
    }
  }
}
</script>


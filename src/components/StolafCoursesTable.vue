<template>
  <div id="stolaf-courses-table">
    <router-link :to="{ path: `${this.url()}` }">See My Courses</router-link>
    <button v-on:click="test()">test</button>
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
// import columns from './Columns.js'
import ActionButtons from './ActionButtons.vue'
import courseTypes from './dropDownItems/CourseTypes.js'

import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

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
      filters: {},
      columns: [
        {
          label: 'Status', 
          field: 'status',
          filterOptions: {
            placeholder: 'All',
            enabled: true,
            filterDropdownItems: [
              {text: 'Open', value: 'O'},
              {text: 'Closed', value: 'C'},
            ],
          }
        },
        { label: 'Name', 
          field: 'name',
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { 
          label: 'Dept', 
          field: 'dept_num_sec',
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            filterValue: '',
            filterDropdownItems: departments(),
            filterFn: this.deptFilterFn
          }
        },
        {
          label: 'Gereqs', 
          field: 'gereqs',
          filterOptions: {
            placeholder: 'Any',
            enabled: true,
            filterDropdownItems: ges()
          }
        },
        {
          label: 'Days', 
          field: 'days',
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Times', 
          field: 'times',
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: true,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Rating', 
          field: 'rating',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        { label: 'Reviews', 
          field: 'reviews',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        { label: 'Prereqs', 
          field: 'has_prereqs',
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Actions', 
          field: 'actions',
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
      ],
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
    deptFilterFn(data, filterString) {
      console.log(filterString)
      if (this.filters['Dept'] !== filterString) {
        this.filters['Dept'] = filterString
        console.log(this.filters)
      }
      return data.includes(filterString)
    },
    test() {
      console.log(columns[2].filterOptions.filterValue)
    },
    url() {
      var url = `me/?year=${this.year}&semester=${this.semester}&draft=${this.draftNum}&type=${this.courseType}&`
      url += `keys=${Object.keys(this.filters)}`
      return url
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


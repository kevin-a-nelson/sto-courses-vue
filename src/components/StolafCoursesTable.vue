<template>
  <div id="stolaf-courses-table">
    <router-link :to="{ path: `${this.url()}` }">See My Courses</router-link>

    <year-selector v-on:newYearSelected="setSelectedValues"/>
    <semester-selector v-on:newSemesterSelected="setSelectedValues"/>
    <type-selector v-on:newTypeSelected="setSelectedValues"/>
    <more-info-modal v-bind:moreInfoData="moreInfoData" />
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered">
      >
      <template slot="table-row" slot-scope="props">
        <!-- Action Column -->
        <div v-if="props.column.field == 'actions'">
          <button v-on:click="moreInfo(props.row)">View</button>
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
import ActionButtons from './ActionButtons.vue'
import courseTypes from './dropDownItems/CourseTypes.js'
import YearSelector from './YearSelector.vue'
import TypeSelector from './TypeSelector.vue'
import MoreInfoModal from './MoreInfoModal.vue'

import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

import SemesterSelector from './SemesterSelector.vue'

export default {
  name: 'stolaf-courses-table',
  components: {
    MoreInfoModal,
    TypeSelector,
    SemesterSelector,
    ActionButtons,
    YearSelector
  },
  created() {
    this.getStolafTermCourses()
  },
  data() {
    return {
      semester: Number(this.$route.query.semester) || 1,
      draftNum: Number(this.$route.query.draft) || 1,
      courseType: this.$route.query.type || 'class',
      deptFilterValue: '',
      selectedValues: {
        year: 2019,
        semester: 1,
        draft: 1,
        type: 'class',
      },
      moreInfoData: {
        name: '',
        description: '',
        prereqs: '',
        notes: '',
        prof: '',
        prof_url: ''
      },
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
    moreInfo(row) {
      this.moreInfoData.description = row.description
      this.moreInfoData.prereqs = row.prereqs
      this.moreInfoData.notes = row.notes
      this.moreInfoData.prof = row.prof
      this.moreInfoData.name = row.name
      this.moreInfoData.prof_url = row.prof_url
      this.$modal.show('more-info')
    },
    deptFilterFn(data, filterString) {
      if (this.deptFilterValue !== filterString) {
        this.deptFilterValue = filterString
      }
      return data.includes(filterString)
    },
    test() {
      console.log(this.deptFilterValue)
    },
    url() {
      return '/'
    },
    getStolafTermCourses() {
      var year =  this.selectedValues.year
      var semester = this.selectedValues.semester
      var type = this.selectedValues.type
      var term = `${year}${semester}`

      this.rows = []
      axios.get(`api/courses?term=${term}&type=${type}`).then(response => {
        this.rows = response.data.courses
      })
    },
    addCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`
      axios.post(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`)
    },
    setSelectedValues(key, value) {
      this.selectedValues[key] = value
      this.getStolafTermCourses()
    }
  }
}
</script>

<style>

vue-good-table {
  font-size: 5px;
  background: blue;
}
  
</style>


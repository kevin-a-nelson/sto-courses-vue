<template>
  <div id="stolaf-courses-table">
    <router-link :to="{ path: `${this.url()}` }">See My Courses</router-link>
    <!-- Selectors -->
    <year-selector v-on:newYearSelected="setSelectedValues" v-bind:querySelectedYear="selectedValues.year"/>
    <semester-selector v-on:newSemesterSelected="setSelectedValues" v-bind:querySelectedSemester="selectedValues.semester"/>
    <type-selector v-on:newTypeSelected="setSelectedValues" v-bind:querySelectedType="selectedValues.type"/>
    <!-- Table -->
    <hide-options v-on:newHideOptions="setHiddenColumns"/>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered">
      >
    <!-- Table Modifications -->
      <template slot="table-row" slot-scope="props">
    <!-- Actions Column -->
        <div v-if="props.column.field == 'actions'">
          <button v-on:click="moreInfo(props.row)">View</button>
          <button v-on:click="addCourse(props.row.id)">Add</button>
        </div>
      </template>
    </vue-good-table>
    <!-- More Info Modal -->
    <more-info-modal v-bind:moreInfoData="moreInfoData" />
  </div>
</template>

<script>
import axios from 'axios'
import MoreInfoModal from './MoreInfoModal.vue'
import YearSelector from './YearSelector.vue'
import SemesterSelector from './SemesterSelector.vue'
import TypeSelector from './TypeSelector.vue'
import HideOptions from './HideOptions.vue'

import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

export default {
  name: 'stolaf-courses-table',
  components: {
    HideOptions,
    MoreInfoModal,
    TypeSelector,
    SemesterSelector,
    YearSelector
  },
  created() {
    this.getSelectedValues()
    this.getStolafTermCourses()
  },
  data() {
    return {
      value: null,
      options: ['list', 'of', 'options'],
      deptFilterValue: '',
      selectedValues: {
        year: '',
        semester: '',
        draft: '',
        type: '',
      },
      hiddenColumns: {
        status: true,
        name: true,
        dept: true,
        gereqs: true,
        days: true,
        times: true,
        rating: true,
        difficulty: true,
        reviews: true,
        prereqs: true,
        actions: true
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
          hidden: false,
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
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { 
          label: 'Dept', 
          field: 'dept_num_sec',
          hidden: false,
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
          hidden: false,
          filterOptions: {
            placeholder: 'Any',
            enabled: true,
            filterDropdownItems: ges()
          }
        },
        {
          label: 'Days', 
          field: 'days',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Times', 
          field: 'times',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: false,
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
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
        { label: 'Actions', 
          field: 'actions',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          }
        },
      ],
      rows: [],
    }
  },
  methods: {
    setHiddenColumns(newHiddenColumns) {
      this.columns.forEach(function(column) {
        column.hidden = false
        if(newHiddenColumns.includes(column.label)) {
          column.hidden = true
        }
      })
    },
    getSelectedValues() {
      var query = this.$route.query
      this.selectedValues.year = query.year || 2019
      this.selectedValues.semester = query.semester || 1
      this.selectedValues.draft = query.draft || 1
      this.selectedValues.type = query.type || 'class'
    },
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
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var type = this.selectedValues.type

      return `/me?year=${year}&semester=${semester}&type=${type}&draft=${draft}`
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


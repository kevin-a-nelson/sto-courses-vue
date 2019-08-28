<template>
  <div id="user-courses-table">
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
    <more-info-modal v-bind:moreInfoData="moreInfoData"/>
  </div>
</template>

<script>
import axios from 'axios'
import MoreInfoModal from './MoreInfoModal.vue'
import YearSelector from './YearSelector.vue'
import SemesterSelector from './SemesterSelector.vue'
import DraftSelector from './DraftSelector.vue'
import HideOptions from './HideOptions.vue'
import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

export default {
  name: 'user-courses-table',
  props: ['rows', 'selectedValues'],
  components: {
    DraftSelector,
    MoreInfoModal,
    YearSelector,
    SemesterSelector,
    HideOptions
  },
  created() {
  },
  data() {
    return {
      moreInfoData: {
        description: '',
        prereqs: '',
        notes: '',
        prof: ''
      },
      columns: [
        {
          label: 'Status', 
          field: 'status',
          hidden: false,
          filterOptions: {
            placeholder: 'All',
            filterDropdownItems: [
              {text: 'Open', value: 'O'},
              {text: 'Closed', value: 'C'},
            ],
          }
        },
        {
          label: 'Seats',
          field: 'seats',
          hidden: false,
          filterOptions: {
          }
        },
        {
          label: 'Credits',
          field: 'credits',
          hidden: false,
          filterOptions: {
            filterValue: '',
          },
        },
        { label: 'Name', 
          field: 'name',
          hidden: false,
          filterOptions: {
            placeholder: 'All',
            filterValue: '',
          }
        },
        { 
          label: 'Dept Num Sec', 
          field: 'dept_num_sec',
          hidden: true,
          filterOptions: {
            placeholder: 'All',
            filterValue: '',
            filterDropdownItems: departments(),
          }
        },
        { 
          label: 'Dept', 
          field: 'dept',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: departments(),
          }
        },
        { 
          label: 'Num', 
          field: 'num',
          type: 'number',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [ 100, 200, 300 ],
          }
        },
        {
          label: 'Sec',
          field: 'sec',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All'
          }
        },
        {
          label: 'Gereqs', 
          field: 'gereqs',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'Any',
            filterDropdownItems: ges()
          }
        },
        {
          label: 'Days', 
          field: 'days',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
          }
        },
        { label: 'Times', 
          field: 'times',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
          }
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: false,
          filterOptions: {
            placeholder: 'All',
          }
        },
        { label: 'Rating', 
          field: 'rating',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [
              { text: '1 or more', value: 1 },
              { text: '2 or more', value: 2 },
              { text: '3 or more', value: 3 },
              { text: '4 or more', value: 4 },
            ],
          },
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [
              { text: '2 or less', value: 2 },
              { text: '3 or less', value: 3 },
              { text: '4 or less', value: 4 },
              { text: '5 or less', value: 5 },
            ],
          },
          type: 'number'
        },
        {
          label: 'Reviews', 
          field: 'reviews',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [
              { text: '5 or more', value: 5 },
              { text: '10 or more', value: 10 },
              { text: '15 or more', value: 15 },
              { text: '20 or more', value: 20 },
            ]
          },
          type: 'number'
        },
        {
          label: 'Rating Difficulty Reviews',
          field: 'rating_difference_reviews',
          hidden: true,
          filterOptions: {
            filterValue: '',
          }
        },
        { label: 'Prereqs', 
          field: 'has_prereqs',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
          }
        },
        { label: 'Actions', 
          field: 'actions',
          hidden: false
        },
      ],
    }
  },
  methods: {
    removeCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.$emit('rowsChanged')
      }).catch(error => {
      })
    }
  },
  //   getSelectedValues() {
  //     var query = this.$route.query
  //     this.selectedValues.year = query.year || 2019
  //     this.selectedValues.semester = query.semester || 1
  //     this.selectedValues.draft = query.draft || 1
  //     this.selectedValues.type = query.type || 'class'
  //   },
  //   setSelectedValue(key, value) {
  //     this.selectedValues[key] = value
  //     this.getUserTermCourses()
  //   },
  //   moreInfo(row) {
  //     this.moreInfoData.description = row.description
  //     this.moreInfoData.prereqs = row.prereqs
  //     this.moreInfoData.notes = row.notes
  //     this.moreInfoData.prof = row.prof
  //     this.$modal.show('more-info')
  //   },
  //   url() {
  //     var year = this.selectedValues.year
  //     var semester = this.selectedValues.semester
  //     var draft = this.selectedValues.draft
  //     var type = this.selectedValues.type

  //     return `/?year=${year}&semester=${semester}&type=${type}&draft=${draft}`
  //   },
  //   getUserTermCourses() {
  //     var year = this.selectedValues.year
  //     var semester = this.selectedValues.semester
  //     var draft = this.selectedValues.draft
  //     var term = `${year}${semester}`

  //     axios.get(`api/terms?term=${term}&order=${draft}`).then(response => {
  //       this.rows = response.data[0].courses
  //     })
  //   },
    removeCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.$emit('rowsChanged')
      })
    }
  // }
}
</script>

<style>

/*#user-courses-table {
  margin: 30px;
}*/
</style>

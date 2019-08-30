<template>
  <div id="stolaf-courses-table">
    <!-- Notifications -->
    <notifications group="foo" position="top right"/>
    <!-- Table -->
    <vue-good-table
      theme="nocturnal"
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered"
      :pagination-options="paginationOptions"
      >
    <!-- Table Modifileications -->
      <template slot="table-row" slot-scope="props">
    <!-- Actions Column -->
        <div>
          <div v-if="props.column.field == 'actions'" style="min-width: 115px;">
            <b-button class="action-button" type="is-info" v-on:click="moreInfo(props.row)">
              <eye-icon /> 
            </b-button>
            <b-button class="action-button" type="is-info" v-on:click="addCourse(props.row)" >
              <plus-icon />
            </b-button>
          </div>
          <div v-else-if="props.column.field == 'prof'" style="font-weight: 600;">
              <a v-if="props.row.prof_url"
                 target="_blank"
                 :href="`${props.row.prof_url}`"
                 style="color: #167df0; text-decoration: underline;">
                 {{ props.row.prof }}
              </a>
              <span v-else>
                {{ props.row.prof }}
              </span>
          </div>
          <div v-else-if="props.column.field == 'status'" style="font-size: 30px; text-align: center; font-weight: 900;">
            <span v-if="props.row.status === 'C'" style="color: red;">{{ props.row.status }}</span>
            <span v-else style="color: green;">{{ props.row.status }}</span>
          </div>
          <div v-else-if="props.column.field == 'rating'" style="font-size: 30px; text-align: center; font-weight: 900;">
            <span v-if="props.row.rating == 0" style="color: #167df0;">N/A</span>
            <span v-else-if="props.row.rating >= 4" style="color: green;">{{ props.row.rating }} </span>
            <span v-else-if="props.row.rating >= 3" style="color: orange;">{{ props.row.rating }} </span>
            <span v-else-if="props.row.rating >= 2" style="color: orange;">{{ props.row.rating }} </span>
            <span v-else-if="props.row.rating >= 0" style="color: red;">{{ props.row.rating }} </span>
          </div>
          <div v-else-if="props.column.field == 'difficulty'" style="font-size: 30px; text-align: center; font-weight: 900;">
            <span v-if="props.row.rating == 0" style="color: #167df0;">N/A</span>
            <span v-else-if="props.row.difficulty <= 0" style="color: red;">{{ props.row.difficulty }} </span>
            <span v-else-if="props.row.difficulty <= 2" style="color: orange;">{{ props.row.difficulty }} </span>
            <span v-else-if="props.row.difficulty <= 3" style="color: orange;">{{ props.row.difficulty }} </span>
            <span v-else-if="props.row.difficulty <= 4" style="color: green;">{{ props.row.difficulty }} </span>
          </div>
          <div v-else-if="props.column.label == 'Reviews'" style="font-size: 30px; text-align: center; font-weight: 900;">
            <span v-if="props.row.rating == 0" style="color: #167df0;">N/A</span>
            <span v-else-if="props.row.reviews >= 20" style="color: green;">{{ props.row.reviews }} </span>
            <span v-else-if="props.row.reviews >= 15" style="color: orange;">{{ props.row.reviews }} </span>
            <span v-else-if="props.row.reviews >= 5" style="color: orange;">{{ props.row.reviews }} </span>
            <span v-else-if="props.row.reviews >= 0" style="color: red;">{{ props.row.reviews }} </span>
            <span v-else style="color: green;">{{ props.row.reviews }} </span>
          </div>
          <span v-else style="font-weight: 900;">
            {{props.formattedRow[props.column.field]}}
          </span>
        </div>
      </template>
      <template slot="table-column" slot-scope="props">
        <span style="font-weight: 900;">
          {{ props.column.label }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import axios from 'axios'
import MoreInfoModal from './MoreInfoModal.vue'
import YearSelector from './YearSelector.vue'
import SemesterSelector from './SemesterSelector.vue'
import TypeSelector from './TypeSelector.vue'
import HideOptions from './HideOptions.vue'
import WhosCoursesSelector from './WhosCoursesSelector.vue'
import DraftSelector from './DraftSelector.vue'

import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'
import Plus from '@/assets/plus.png'
import Logo from '@/assets/logo.png'

export default {
  name: 'stolaf-courses-table',
  props: ['rows', 'selectedValues', 'visibleColumns', 'columns'],
  components: {
    WhosCoursesSelector,
    HideOptions,
    MoreInfoModal,
    TypeSelector,
    SemesterSelector,
    YearSelector,
    DraftSelector
  },
  data() {
    return {
      paginationOptions: {
        enabled: false,
        mode: 'pages',
        perPage: 1000,
        position: 'top',
        perPageDropdown: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        dropdownAllowAll: true,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      },
      showShownColumns: false,
      hiddenColumns: [
        'Seats',
        'Dept Num Sec',
        'Sec',
        'Rating Difficulty Reviews',
        'Num',
      ],
      stoDeptFilterValue: '',
      stoCoursesTableFilterValues: {
        status: '',
        name: '',
        dept: '',
        gereqs: '',
        days: '',
        times: '',
        prof: '',
        rating: '',
        difficulty: '',
        reviews: '',
        prereqs: '',
        actions: '',
      },
      moreInfoData: {
        name: '',
        description: '',
        prereqs: '',
        notes: '',
        prof: '',
        prof_url: ''
      },
      columns2: [
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
        {
          label: 'Seats',
          field: 'seats',
          hidden: false,
          filterOptions: {
            filterValue: '',
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
            enabled: true,
          }
        },
        { 
          label: 'Dept Num Sec', 
          field: 'dept_num_sec',
          hidden: true,
          filterOptions: {
            enabled: true,
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
            enabled: true,
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
            enabled: true,
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [ 100, 200, 300 ],
            filterFn: this.numFilterFn
          }
        },
        {
          label: 'Sec',
          field: 'sec',
          hidden: false,
          filterOptions: {
            filterValue: '',
            enabled: false,
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
            enabled: true,
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
            enabled: true,
          }
        },
        { label: 'Times', 
          field: 'times',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
          }
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
          }
        },
        { label: 'Rating', 
          field: 'rating',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
            filterDropdownItems: [
              { text: '1 or more', value: 1 },
              { text: '2 or more', value: 2 },
              { text: '3 or more', value: 3 },
              { text: '4 or more', value: 4 },
            ],
            filterFn: this.ratingFilterFn
          },
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
            filterDropdownItems: [
              { text: '2 or less', value: 2 },
              { text: '3 or less', value: 3 },
              { text: '4 or less', value: 4 },
              { text: '5 or less', value: 5 },
            ],
            filterFn: this.difficultyFilterFn
          },
          type: 'number'
        },
        {
          label: 'Reviews', 
          field: 'reviews',
          hidden: false,
          filterOptions: {
            placeholder: 'All',
            enabled: true,
            filterFn: this.reviewsFilterFn,
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
        { 
          label: 'Prereqs', 
          field: 'has_prereqs',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
          }
        },
        {
          label: 'Actions', 
          field: 'actions',
          hidden: false
        },
      ],
      notificationType: '',
      columnNum: 1
    }
  },
  methods: {
    is_hidden(label) {
      return !this.visibleColumns.includes(label)
    },
    addCourse(row) {
      var course_id = row.id
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      var course_name = row.name
      var semesterStr = this.intSemesterToStr(semester)
      var text = `Added ${course_name} to ${semesterStr} ${year} Draft ${draft}`

      axios.post(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`)
           .then(response => {
              // this.showNotification('foo', 'success' , text)
              this.$emit('rowsChanged')
           })
           .catch(error => {
              this.showNotification('foo', 'error' , 'You already have that course')
           })
    },
    moreInfo(row) {
      this.$emit('showMoreInfo', row)
    },
    showNotification(group, type, text) {
      this.$notify({
        group: group,
        type: type,
        text: text
      });
    },
    intSemesterToStr(semesterInt) {
      var semesterStr = ''
      switch(semesterInt) {
        case 1:
          semesterStr = 'Fall'
          break;
        case 2:
          semesterStr = 'Interim'
          break;
        case 3:
          semesterStr = 'Spring'
          break;
        case 4:
          semesterStr = 'Summer Session 1'
          break;
        case 5:
          semesterStr = 'Summer Session 2'
          break;
      }
      return semesterStr
    },
    // reviewsFilterFn(data, filterString) {
    //   return data >= Number(filterString)
    // },
    // ratingFilterFn(data, filterString) {
    //   return data >= Number(filterString)
    // },
    // difficultyFilterFn(data, filterString) {
    //   return data <= Number(filterString)
    // },
    // resetColumns() {
    //   this.hiddenColumns = [
    //     'Seats',
    //     'Sec',
    //     'Dept Num Sec',
    //     'Rating Difficulty Reviews'
    //   ]
    //   this.setHiddenColumns(this.hiddenColumns)
    //   this.showShownColumns = false
    // },
    // selectedColumn() {
    //   return this.columnNum === 1 ? this.columns : this.columns2
    // },
    // resetFilters() {
    //   this.columnNum = this.columnNum === 1 ? 2 : 1
    // },
    // toggleShowShownColumns() {
    //   this.showShownColumns = !this.showShownColumns
    // },
    // getUserTermCourses() {
    //   var year = this.selectedValues.year
    //   var semester = this.selectedValues.semester
    //   var draft = this.selectedValues.draft
    //   var term = `${year}${semester}`

    //   axios.get(`api/terms?term=${term}&order=${draft}`).then(response => {
    //     this.rows = response.data[0].courses
    //   })
    // },
    // setHiddenColumns(newHiddenColumns) {
    //   this.hiddenColumns = newHiddenColumns
    //   this.columns.forEach(function(column) {
    //     column.hidden = false
    //     if(newHiddenColumns.includes(column.label)) {
    //       column.hidden = true
    //       column.filterValue = ''
    //     }
    //   })
    //   this.columns2.forEach(function(column) {
    //     column.hidden = false
    //     if(newHiddenColumns.includes(column.label)) {
    //       column.hidden = true
    //       column.filterValue = ''
    //     }
    //   })
    // },
    // deptFilterFn(data, filterString) {
    //   return true
    //   if (this.stoDeptFilterValue.dept !== filterString) {
    //     this.stoCoursesTableFilterValues.dept = filterString
    //   }
    //   return data.includes(filterString)
    // },
    // getStolafTermCourses() {
    //   var year =  this.selectedValues.year
    //   var semester = this.selectedValues.semester
    //   var type = this.selectedValues.type
    //   var term = `${year}${semester}`

    //   this.rows = []
    //   axios.get(`api/courses?term=${term}&type=${type}`).then(response => {
    //     this.rows = response.data.courses
    //   })
    // },
    // setSelectedValues(key, value) {
    //   this.selectedValues[key] = value
    //   this.selectedValues.mode === 'stolaf' ? this.getStolafTermCourses() : this.getUserTermCourses()
    // },
    // numFilterFn(data, filterString) {
    //   return data.toString()[0] === filterString[0]
    // }
  }
}
</script>

<style>

.action-button {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  line-height: 0px;
}
  
</style>


<template>
      <!-- classes="my-notification" -->
  <div id="stolaf-courses-table">
    <notifications
      position="top right" 
      group="foo" />
    <!-- Selectors -->
    <div id="selectors">
      <year-selector class="selector" v-on:newYearSelected="setSelectedValues"/>
      <whos-courses-selector class="selector" v-on:newPersonSelected="setSelectedValues"/>
      <semester-selector class="selector" v-on:newSemesterSelected="setSelectedValues"/>
      <type-selector class="selector" v-if="selectedValues.mode !== 'user'" v-on:newTypeSelected="setSelectedValues"/>
      <draft-selector class="selector"
        v-on:newDraftSelected="setSelectedValues" 
        v-if="selectedValues.mode === 'user'"
        v-bind:defaultDraft="selectedValues.draft"
      />
      <button style="max-height: 60px;"v-on:click="toggleShowShownColumns" v-model="showShownColumns">Options</button>
    </div>
    <hide-options 
      v-if="showShownColumns" 
      v-on:newHideOptions="setHiddenColumns"
      v-bind:defaultHiddenColumns="hiddenColumns"/>
    <!-- Table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered"
      :pagination-options="paginationOptions"
      >
    <!-- Table Modifications -->
      <template slot="table-row" slot-scope="props">
    <!-- Actions Column -->
        <div v-if="props.column.field == 'actions'">
          <button v-on:click="moreInfo(props.row)">View</button>
          <button v-if="selectedValues.mode !== 'user'" v-on:click="addCourse(props.row)">Add</button>
          <button v-if="selectedValues.mode === 'user'" v-on:click="removeCourse(props.row.id)">Remove</button>
        </div>
        <div v-else-if="props.column.field == 'prof'">
            <a v-if="props.row.prof_url" 
               target="_blank" 
               :href="`${props.row.prof_url}`">
               {{ props.row.prof }}
            </a>
            <span v-else>
              {{ props.row.prof }}
            </span>
        </div>
        <div style="min-width: 105px;" v-else-if="props.column.field == 'rating_difference_reviews'">
          {{ props.row.rating_difference_reviews }}
        </div>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
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
import WhosCoursesSelector from './WhosCoursesSelector.vue'
import DraftSelector from './DraftSelector.vue'

import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

export default {
  name: 'stolaf-courses-table',
  components: {
    WhosCoursesSelector,
    HideOptions,
    MoreInfoModal,
    TypeSelector,
    SemesterSelector,
    YearSelector,
    DraftSelector
  },
  created() {
    this.getStolafTermCourses()
  },
  data() {
    return {
      selectedValues: {
        mode: 'stolaf',
        year: 2019,
        semester: 1,
        draft: 1,
        type: 'class',
      },
      paginationOptions: {
        enabled: true,
        mode: 'pages',
        perPage: 5,
        position: 'top',
        perPageDropdown: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      },
      showShownColumns: true,
      hiddenColumns: [
        'Dept Num Sec',
        'Status',
        'Name',
        'Gereqs',
        'Days',
        'Times',
        'Prof',
        'Rating Difficulty Reviews',
        'Prereqs',
        'Actions',
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
        {
          label: 'Seats',
          field: 'seats',
          hidden: true,
        },
        {
          label: 'Credits',
          field: 'credits',
          hidden: true,
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
          label: 'Dept Num Sec', 
          field: 'dept_num_sec',
          hidden: true,
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            filterDropdownItems: departments(),
          }
        },
        { 
          label: 'Dept', 
          field: 'dept',
          hidden: false,
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            filterDropdownItems: departments(),
          }
        },
        { 
          label: 'Num', 
          field: 'num',
          hidden: false,
          type: 'number',
          filterOptions: {
            enabled: true,
            placeholder: 'All',
            filterDropdownItems: [ 100, 200, 300 ],
            filterFn: this.numFilterFn
          }
        },
        {
          label: 'Sec',
          field: 'sec',
          hidden: true,
          filterOptions: {
            enabled: false,
            placeHolder: 'All'
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
          hidden: true,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: true,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        {
          label: 'Reviews', 
          field: 'reviews',
          hidden: true,
          filterOptions: {
            placeHolder: 'All',
            enabled: true,
          },
          type: 'number'
        },
        {
          label: 'Rating Difficulty Reviews',
          field: 'rating_difference_reviews',
          hidden: false
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
          hidden: false
        },
      ],
      userColumns: [
        {
          label: 'Status', 
          field: 'status',
          hidden: false
        },
        { label: 'Name', 
          field: 'name',
          hidden: false
        },
        { 
          label: 'Dept Num Sec', 
          field: 'dept_num_sec',
          hidden: false
        },
        { 
          label: 'Dept', 
          field: 'dept',
          hidden: true
        },
        { 
          label: 'Num', 
          field: 'num',
          hidden: true,
          type: 'number'
        },
        {
          label: 'Sec',
          field: 'sec',
          hidden: true
        },
        {
          label: 'Gereqs', 
          field: 'gereqs',
          hidden: false
        },
        {
          label: 'Days', 
          field: 'days',
          hidden: false
        },
        { label: 'Times', 
          field: 'times',
          hidden: false
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: false
        },
        { label: 'Rating', 
          field: 'rating',
          hidden: true,
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: true,
          type: 'number'
        },
        { 
          label: 'Reviews', 
          field: 'reviews',
          hidden: true,
          type: 'number'
        },
        {
          label: 'Rating Difficulty Reviews',
          field: 'rating_difference_reviews',
          hidden: false
        },
        { label: 'Prereqs', 
          field: 'has_prereqs',
          hidden: false,
          filterOptions: {
            placeHolder: 'All',
            enabled: false,
          }
        },
        { label: 'Actions', 
          field: 'actions',
          hidden: false
        },
      ],
      rows: [],
      notificationType: ''
    }
  },
  methods: {
    toggleShowShownColumns() {
      this.showShownColumns = !this.showShownColumns
    },
    getUserTermCourses() {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.get(`api/terms?term=${term}&order=${draft}`).then(response => {
        this.rows = response.data[0].courses
      })
    },
    setHiddenColumns(newHiddenColumns) {
      this.hiddenColumns = newHiddenColumns
      this.columns.forEach(function(column) {
        column.hidden = true
        if(newHiddenColumns.includes(column.label)) {
          column.hidden = false
        }
      })
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
      return true
      if (this.stoDeptFilterValue.dept !== filterString) {
        this.stoCoursesTableFilterValues.dept = filterString
      }
      return data.includes(filterString)
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
    showNotification(group, type, text) {
      this.$notify({
        group: group,
        type: type,
        text: text
      });
    },
    addCourse(row) {
      var course_id = row.id
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`
      axios.post(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`)
           .then(response => {
            var course_name = row.name
            var semesterStr = this.intSemesterToStr(semester)
            var text = `Added ${course_name} to ${semesterStr} ${year} Draft ${draft}`
              this.showNotification('foo', 'success' , text)
           })
           .catch(error => {
              this.showNotification('foo', 'warn' , 'you already have that course')
           })
    },
    removeCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.getUserTermCourses()
      })
    },
    setSelectedValues(key, value) {
      this.selectedValues[key] = value
      this.paginationOptions.enabled  = this.selectedValues.mode === 'stolaf' ? true : false
      this.selectedValues.mode === 'stolaf' ? this.getStolafTermCourses() : this.getUserTermCourses()
      this.selectedValues.mode === 'stolaf' ? this.enableTableFilters() : this.disableTableFilters()
    },
    disableTableFilters() {
      this.columns.forEach(column => {
        if (column.filterOptions) {
          column.filterOptions.enabled = false
        }
      })
    },
    enableTableFilters() {
      this.columns.forEach(column => {
        if (column.filterOptions) {
          column.filterOptions.enabled = true
        }
      })
    },
    numFilterFn(data, filterString) {
      return data.toString()[0] === filterString[0]
    }
  }
}
</script>

<style>

/*.my-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}*/

#stolaf-courses-table {
  padding: 30px;
}

#selectors {
  display: flex;
  margin-bottom: 10px;
}

#selectors * {
  margin-right: 5px;
}

@media (max-width: 650px) {
  #selectors {
    display: block;
  }

  #selectors button {
    width: 100%;
  }

  .selector * {
    width: 100%;
  }
}

vue-good-table {
  font-size: 5px;
  background: blue;
}
  
</style>


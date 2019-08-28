<template>
  <div class="home">
    <div id="top-section">
      <div id="top-section-selectors">
        <year-selector v-on:newYearSelected="updateSelectedValuesAndRows"/>
        <semester-selector v-on:newSemesterSelected="updateSelectedValuesAndRows"/>
        <button v-on:click="toggleShowHideOptions">Hide Columns</button>
        <button v-on:click="resetColumns">Reset Columns</button>
      </div>
      <div id="hide-options-container">
        <hide-options 
          v-if="showHideOptions"
          v-bind:visibleColumns="visibleColumns"
          v-on:newHideOptions="updateHideOptions"/>
      </div>
    </div>
    <div id="stolaf-section">
      <div id="stolaf-courses-table-options">
        <type-selector v-on:newTypeSelected="updateSelectedValuesAndRows"/>
        <button>Reset Filters</button>
      </div>
      <stolaf-courses-table 
        v-bind:rows="stolafTableRows"
        v-bind:selectedValues="selectedValues"
        v-on:rowsChanged="getUserTableRows"
        v-bind:visibleColumns="visibleColumns"
        v-bind:columns="stolafColumns"
        />
    </div>
    <div id="user-section">
      <div id="user-courses-table-options">
        <draft-selector v-on:newDraftSelected="updateSelectedValuesAndRows"/>
      </div>
      <user-courses-table
        v-bind:rows="userTableRows"
        v-bind:selectedValues="selectedValues"
        v-on:rowsChanged="getUserTableRows"
        v-bind:columns="userColumns"
        />
    </div>
  </div>
</template>

<script>
import StolafCoursesTable from '@/components/StolafCoursesTable.vue'
import UserCoursesTable from '@/components/UserCoursesTable'
import YearSelector from '@/components/YearSelector.vue'
import SemesterSelector from '@/components/SemesterSelector.vue'
import DraftSelector from '@/components/DraftSelector.vue'
import TypeSelector from '@/components/TypeSelector.vue'
import axios from 'axios'
import HideOptions from '@/components/HideOptions.vue'
import { departments } from '@/components/dropDownItems/Departments'
import { ges } from '@/components/dropDownItems/Ges'

export default {
  name: 'home',
  components: {
    StolafCoursesTable,
    YearSelector,
    UserCoursesTable,
    SemesterSelector,
    DraftSelector,
    TypeSelector,
    HideOptions
  },
  created() {
    this.getStolafTableRows()
    this.getUserTableRows()
    this.updateHideOptions(this.visibleColumns)
  },
  data() {
    return {
      stolafColumns: [
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
            filterValue: '',
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
        { label: 'Prereqs', 
          field: 'has_prereqs',
          hidden: true,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
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
          hidden: false,
        },
        {
          label: 'Seats',
          field: 'seats',
          hidden: false,
        },
        {
          label: 'Credits',
          field: 'credits',
          hidden: false,
        },
        { label: 'Name', 
          field: 'name',
          hidden: false,
        },
        { 
          label: 'Dept', 
          field: 'dept',
          hidden: false,
        },
        { 
          label: 'Num', 
          field: 'num',
          type: 'number',
          hidden: false,
        },
        {
          label: 'Sec',
          field: 'sec',
          hidden: false,
        },
        {
          label: 'Gereqs', 
          field: 'gereqs',
          hidden: false,
        },
        {
          label: 'Days', 
          field: 'days',
          hidden: false,
        },
        { label: 'Times', 
          field: 'times',
          hidden: false,
        },
        { label: 'Prof', 
          field: 'prof',
          hidden: false,
        },
        { label: 'Rating', 
          field: 'rating',
          hidden: false,
          type: 'number'
        },
        { label: 'Difficulty', 
          field: 'difficulty',
          hidden: false,
          type: 'number'
        },
        {
          label: 'Reviews', 
          field: 'reviews',
          hidden: false,
          type: 'number'
        },
        { label: 'Prereqs', 
          field: 'has_prereqs',
          hidden: false,
        },
        { label: 'Actions', 
          field: 'actions',
          hidden: false
        },
      ],
      sortedVisibleColumns: [
        'Status',
        'Credits',
        'Seats',
        'Name',
        'Dept',
        'Num',
        'Sec',
        'Gereqs',
        'Days',
        'Times',
        'Prof',
        'Rating',
        'Difficulty',
        'Reviews',
        'Prereqs',
        'Actions',      
      ],
      visibleColumns: [
        'Status',
        'Name',
        'Dept',
        'Num',
        'Gereqs',
        'Days',
        'Times',
        'Prof',
        'Rating',
        'Difficulty',
        'Reviews',
        'Prereqs',
        'Actions',
      ],
      defaultVisibleColumns: [
        'Status',
        'Name',
        'Dept',
        'Num',
        'Gereqs',
        'Days',
        'Times',
        'Prof',
        'Rating',
        'Difficulty',
        'Reviews',
        'Prereqs',
        'Actions',
      ],

      showHideOptions: false,
      userTableRows: [],
      stolafTableRows: [],
      selectedValues: {
        year: 2019,
        semester: 1,
        draft: 1,
        type: 'class'
      }
    }
  },
  methods: {
    reviewsFilterFn(data, filterString) {
      return data >= Number(filterString)
    },
    ratingFilterFn(data, filterString) {
      return data >= Number(filterString)
    },
    difficultyFilterFn(data, filterString) {
      return data <= Number(filterString)
    },
    resetColumns() {
      this.visibleColumns = this.defaultVisibleColumns
      if(this.showHideOptions) {
        this.showHideOptions = false
      }
      this.updateHideOptions(this.visibleColumns)
    },
    updateHideOptions(newVisibleColumns) {
      this.visibleColumns = []
      this.sortedVisibleColumns.forEach(column => {
        if(newVisibleColumns.includes(column)) {
          this.visibleColumns.push(column)
        }
      })
      this.stolafColumns.forEach(column => {
        column.hidden = true
        if(newVisibleColumns.includes(column.label)) {
          column.hidden = false
        }
      })
      this.userColumns.forEach(column => {
        column.hidden = true
        if(newVisibleColumns.includes(column.label)) {
          column.hidden = false
        }
      })
    },
    toggleShowHideOptions() {
      this.showHideOptions = !this.showHideOptions
    },
    updateSelectedValuesAndRows(key, value) {
      this.selectedValues[key] = value

      if(key === 'year' || key === 'semester') {
        this.getUserTableRows()
        this.getStolafTableRows()
      }
      else if (key === 'type') {
        this.getStolafTableRows()
      }
      else if (key === 'draft') {
        this.getUserTableRows()
      }
    },
    getStolafTableRows() {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var type = this.selectedValues.type
      var term = `${year}${semester}`

      this.stolafTableRows = []
      axios.get(`api/courses?term=${term}&type=${type}`).then(response => {
        this.stolafTableRows = response.data.courses
      })
    },
    getUserTableRows() {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var type = this.selectedValues.type
      var term = `${year}${semester}`

      axios.get(`api/terms?term=${term}&order=${draft}`).then(response => {
        this.userTableRows = response.data[0].courses
      })
    }
  }
}
</script>

<style>

#hide-options-container {
  padding: 10px 30px;
}

#top-section-selectors {
  margin: 10px auto 0 auto;
  display: flex;
  width: 500px;
  justify-content: space-between;
}

#top-section-selectors button {
  border-radius: 5px;
}

#user-section {
  padding: 0px 30px 30px 30px;
}

#stolaf-section {
  padding: 30px;
  padding: 0px 30px 30px 30px;
}

#user-courses-table-options {
  margin-bottom: 10px;
  display: flex;
  width: 400px;
  justify-content: space-between;
}

#stolaf-courses-table-options {
  margin-bottom: 10px;
  display: flex;
  width: 300px;
  justify-content: space-between;
}

</style>

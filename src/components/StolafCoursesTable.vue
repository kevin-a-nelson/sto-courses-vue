<template>
      <!-- classes="my-notification" -->
  <div id="stolaf-courses-table">
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
          <button>View</button>
          <button v-on:click="addCourse(props.row)" >Add</button>
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
  created() {
    // this.setHiddenColumns(this.hiddenColumns)
    // this.getStolafTermCourses()
  },
  data() {
    return {
      paginationOptions: {
        enabled: true,
        mode: 'pages',
        perPage: 5,
        position: 'bottom',
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
      showShownColumns: false,
      hiddenColumns: [
        'Seats',
        'Dept Num Sec',
        'Sec',
        'Rating Difficulty Reviews',
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
      // columns: [
      //   {
      //     label: 'Status', 
      //     field: 'status',
      //     hidden: false,
      //     filterOptions: {
      //       placeholder: 'All',
      //       enabled: true,
      //       filterDropdownItems: [
      //         {text: 'Open', value: 'O'},
      //         {text: 'Closed', value: 'C'},
      //       ],
      //     }
      //   },
      //   {
      //     label: 'Seats',
      //     field: 'seats',
      //     hidden: false,
      //     filterOptions: {
      //     }
      //   },
      //   {
      //     label: 'Credits',
      //     field: 'credits',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //     },
      //   },
      //   { label: 'Name', 
      //     field: 'name',
      //     hidden: false,
      //     filterOptions: {
      //       placeholder: 'All',
      //       filterValue: '',
      //       enabled: true,
      //     }
      //   },
      //   { 
      //     label: 'Dept Num Sec', 
      //     field: 'dept_num_sec',
      //     hidden: true,
      //     filterOptions: {
      //       enabled: true,
      //       placeholder: 'All',
      //       filterValue: '',
      //       filterDropdownItems: departments(),
      //     }
      //   },
      //   { 
      //     label: 'Dept', 
      //     field: 'dept',
      //     hidden: false,
      //     filterOptions: {
      //       enabled: true,
      //       filterValue: '',
      //       placeholder: 'All',
      //       filterDropdownItems: departments(),
      //     }
      //   },
      //   { 
      //     label: 'Num', 
      //     field: 'num',
      //     type: 'number',
      //     hidden: false,
      //     filterOptions: {
      //       enabled: true,
      //       filterValue: '',
      //       placeholder: 'All',
      //       filterDropdownItems: [ 100, 200, 300 ],
      //       filterFn: this.numFilterFn
      //     }
      //   },
      //   {
      //     label: 'Sec',
      //     field: 'sec',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       enabled: false,
      //       placeholder: 'All'
      //     }
      //   },
      //   {
      //     label: 'Gereqs', 
      //     field: 'gereqs',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'Any',
      //       enabled: true,
      //       filterDropdownItems: ges()
      //     }
      //   },
      //   {
      //     label: 'Days', 
      //     field: 'days',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //     }
      //   },
      //   { label: 'Times', 
      //     field: 'times',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //     }
      //   },
      //   { label: 'Prof', 
      //     field: 'prof',
      //     hidden: false,
      //     filterOptions: {
      //       placeholder: 'All',
      //       enabled: true,
      //     }
      //   },
      //   { label: 'Rating', 
      //     field: 'rating',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //       filterDropdownItems: [
      //         { text: '1 or more', value: 1 },
      //         { text: '2 or more', value: 2 },
      //         { text: '3 or more', value: 3 },
      //         { text: '4 or more', value: 4 },
      //       ],
      //       filterFn: this.ratingFilterFn
      //     },
      //     type: 'number'
      //   },
      //   { label: 'Difficulty', 
      //     field: 'difficulty',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //       filterDropdownItems: [
      //         { text: '2 or less', value: 2 },
      //         { text: '3 or less', value: 3 },
      //         { text: '4 or less', value: 4 },
      //         { text: '5 or less', value: 5 },
      //       ],
      //       filterFn: this.difficultyFilterFn
      //     },
      //     type: 'number'
      //   },
      //   {
      //     label: 'Reviews', 
      //     field: 'reviews',
      //     hidden: false,
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //       filterFn: this.reviewsFilterFn,
      //       filterDropdownItems: [
      //         { text: '5 or more', value: 5 },
      //         { text: '10 or more', value: 10 },
      //         { text: '15 or more', value: 15 },
      //         { text: '20 or more', value: 20 },
      //       ]
      //     },
      //     type: 'number'
      //   },
      //   {
      //     label: 'Rating Difficulty Reviews',
      //     field: 'rating_difference_reviews',
      //     hidden: true,
      //     filterOptions: {
      //       filterValue: '',
      //     }
      //   },
      //   { label: 'Prereqs', 
      //     field: 'has_prereqs',
      //     hidden: this.is_hidden('Prereqs'),
      //     filterOptions: {
      //       filterValue: '',
      //       placeholder: 'All',
      //       enabled: true,
      //     }
      //   },
      //   { label: 'Actions', 
      //     field: 'actions',
      //     hidden: false
      //   },
      // ],
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
      axios.post(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`)
           .then(response => {
            // var course_name = row.name
            // var semesterStr = this.intSemesterToStr(semester)
            // var text = `Added ${course_name} to ${semesterStr} ${year} Draft ${draft}`
              // this.showNotification('foo', 'success' , text)
              // this.test()
              this.$emit('rowsChanged')
           })
           .catch(error => {
              // this.showNotification('foo', 'warn' , 'you already have that course')
           })
    },
    // reviewsFilterFn(data, filterString) {
    //   return data >= Number(filterString)
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
    // ratingFilterFn(data, filterString) {
    //   return data >= Number(filterString)
    // },
    // difficultyFilterFn(data, filterString) {
    //   return data <= Number(filterString)
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
    // moreInfo(row) {
    //   this.moreInfoData.description = row.description
    //   this.moreInfoData.prereqs = row.prereqs
    //   this.moreInfoData.notes = row.notes
    //   this.moreInfoData.prof = row.prof
    //   this.moreInfoData.name = row.name
    //   this.moreInfoData.prof_url = row.prof_url
    //   this.$modal.show('more-info')
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
    // intSemesterToStr(semesterInt) {
    //   var semesterStr = ''
    //   switch(semesterInt) {
    //     case 1:
    //       semesterStr = 'Fall'
    //       break;
    //     case 2:
    //       semesterStr = 'Interim'
    //       break;
    //     case 3:
    //       semesterStr = 'Spring'
    //       break;
    //     case 4:
    //       semesterStr = 'Summer Session 1'
    //       break;
    //     case 5:
    //       semesterStr = 'Summer Session 2'
    //       break;
    //   }
    //   return semesterStr
    // },
    // showNotification(group, type, text) {
    //   this.$notify({
    //     group: group,
    //     type: type,
    //     text: text
    //   });
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

#stolaf-courses-table {
  /*background: #FF0000;*/
  /*background: url(https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg);*/
  /*background: url(https://png.pngtree.com/thumb_back/fw800/back_pic/04/37/13/24584a936be11a9.jpg);*/
  /*height: 1000px;*/
  height: 100%;
}


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
/*
#stolaf-courses-table {
  padding: 30px;
}

#selectors {
  display: flex;
  margin-bottom: 10px;
}

#selectors * {
  opacity: 0.8;
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
*/
vue-good-table {
  height: 100%;
  font-size: 5px;
  background: blue;
}
  
</style>


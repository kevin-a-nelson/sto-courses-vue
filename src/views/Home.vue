<template>
  <div id="home">
    <my-nav-bar />
    <div id="body-container" @mouseover="mouseOverBody">
      <!-- Top Section Above Table -->
      <more-info-modal v-bind:moreInfoData="moreInfoData"
                       v-bind:modalName="'more-info'"
                       v-bind:nightMode="nightMode"/>
      <div id="website-header" class="my-opacity ">
        <div id="top-section">
          <div id="top-section-selectors">
          <p class="website-header-title">Rate my Professor Course Planner</p>
            <year-selector v-on:newYearSelected="updateSelectedValuesAndRows"/>
            <semester-selector v-on:newSemesterSelected="updateSelectedValuesAndRows" v-on:newModeSelected="newModeSelected"/>
          </div>
        </div>
      </div>
      <!-- User Table -->
      <div id="user-section">
        <div id="user-courses-table-options" class="my-opacity">
          <div>
            <h1 id="my-courses-header" class="website-header-title">My Courses</h1>
          </div>
          <div>
            <draft-selector style="margin-top: 20px;" v-on:newDraftSelected="updateSelectedValuesAndRows"/>
          </div>
        </div>
        <user-courses-table
          v-bind:rows="userTableRows"
          v-bind:nightMode="nightMode"
          v-bind:selectedValues="selectedValues"
          v-on:rowsChanged="getUserTableRows"
          v-bind:columns="userColumns"
          v-on:showMoreInfo="showMoreInfo"
          />
      </div>
      <!-- Stolaf Table -->
      <div id="stolaf-section" name="stolaf-courses">
        <div id="stolaf-courses-table-options" class="my-opacity ">
          <div>
            <h1 class="website-header-title">Stolaf Courses</h1>
          </div>
          <div>
            <type-selector v-on:newTypeSelected="updateSelectedValuesAndRows"/>
          </div>
        </div>
        <p class="website-header-title" v-if="coursesUnavailable">Courses for this term arn't avaiable yet</p>
        <stolaf-courses-table
          v-bind:nightMode="nightMode"
          v-on:showMoreInfo="showMoreInfo"
          v-bind:rows="stolafTableRows"
          v-bind:selectedValues="selectedValues"
          v-on:rowsChanged="getUserTableRows"
          v-bind:columns="stolafColumns"
          />
      </div>
    </div>
    <div id="up-arrow-container">
      <a href="#home" v-smooth-scroll>
        <div id="up-arrow-circle">
          <i id="up-arrow-icon" class="material-icons">arrow_upward</i>
        </div>
      </a>
    </div>
    <div id="contact">
      <div id="contact-container">
        <div id="contact-left">
          <p id="contact-middle-top1"><i class="material-icons">email</i></p>
          <p><i class="material-icons">phone</i></p>
        </div>
        <div id="contact-middle">
          <p id="contact-middle-top2"><span>nelson67@stolaf.edu</span></p>
          <p><span>612-236-5220</span></p>
        </div>
        <div id="contact-right">
          <a target="blank" href="https://github.com/SamuraiViking">
            <p><img src="../assets/github-light-32.png"></p>
          </a>
          <a href="https://www.linkedin.com/in/kevin-nelson1/" target="blank">
            <p><img src="../assets/linkedin-32.png"></p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import StolafCoursesTable from '@/components/StolafCoursesTable.vue'
import MyNavBar from '@/components/MyNavBar.vue'
import UserCoursesTable from '@/components/UserCoursesTable'
import YearSelector from '@/components/YearSelector.vue'
import SemesterSelector from '@/components/SemesterSelector.vue'
import DraftSelector from '@/components/DraftSelector.vue'
import TypeSelector from '@/components/TypeSelector.vue'
import HideOptions from '@/components/HideOptions.vue'
import { departments } from '@/components/dropDownItems/Departments'
import { ges } from '@/components/dropDownItems/Ges'
import MoreInfoModal from '@/components/MoreInfoModal.vue'
import MobileTable from '@/components/MobileTable.vue'
import FiltersModal from '@/components/FiltersModal.vue'
import 'buefy/dist/buefy.css'

export default {
  name: 'home',
  components: {
    MyNavBar,
    FiltersModal,
    MobileTable,
    MoreInfoModal,
    StolafCoursesTable,
    YearSelector,
    UserCoursesTable,
    SemesterSelector,
    DraftSelector,
    TypeSelector,
    HideOptions
  },
  created() {
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize();
    this.getStolafTableRows()
    this.getUserTableRows()
    // this.updateHideOptions(this.visibleColumns)
  },
  destroyed() {
    // window.removeEventListener('resize', this.handleResize)
  },
  data() {
    return {
      nightMode: false,
      coursesUnavailable: false,
      selectedSemester: 1,
      selectedYear: 2019,
      window: {
        width: 0,
        height: 0
      },
      /* Info Shown on more info modal */
      moreInfoData: {},
      /* Two Stolaf Columns that switch back and forth when Reset Filters button is pressed */ 
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
          label: 'Name', 
          field: 'name',
          hidden: false,
          filterOptions: {
            placeholder: 'All',
            filterValue: '',
            enabled: true,
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
          filterOptions: {
            enabled: true,
            filterValue: '',
            placeholder: 'All',
            filterDropdownItems: [
              { text: '100', value: 100 },
              { text: '200', value: 200 },
              { text: '300', value: 300 },
            ],
            filterFn: this.numFilterFn
          }
        },
        {
          label: "Ge's", 
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
            filterDropdownItems: [
              'MWF',
              'TTh',
              'M-F',
              'M',
              'Tu',
              'W',
              'Th',
              'F',
              'Other'
            ],
            filterFn: this.daysFilterFn
          }
        },
        { label: 'Times', 
          field: 'times',
          hidden: false,
          filterOptions: {
            filterValue: '',
            placeholder: 'All',
            enabled: true,
            filterDropdownItems: [
              { text: '8 am', value: '08' },
              { text: '9 am', value: '09' },
              { text: '10 am', value: '10' },
              { text: '11 am', value: '11' },
              { text: '12', value: '12' },
              { text: '1 pm', value: '13' },
              { text: '2 pm', value: '14' },
              { text: '3 pm', value: '15' },
              { text: '4 pm', value: '16' },
              { text: '5 pm', value: '17' },
              { text: '6 pm', value: '18' },
              { text: '7 pm', value: '19' },
            ],
            filterFn: this.timesFilterFn
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
        }
      ],
      /* Number used to switch stolafColumns1 to stolafColumns2 and vise versa */
      userColumns: [
        {
          label: 'Status', 
          field: 'status',
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
      ],
      /* Makes column multiselect visible when Hide columns button is pressed */
      showHideOptions: false,
      userTableRows: [],
      stolafTableRows: [],
      /* Default Values */
      selectedValues: {
        year: 2019,
        semester: 1,
        draft: 1,
        type: 'class'
      }
    }
  },
  methods: {
    newModeSelected(mode) {
      this.nightMode = mode
    },
    mouseOverBody(event) {
    },
    newYearSelected() {
    },
    filtersModal() {
      this.$modal.show('filters')
    },
    screenWidthLessThan(width) {
      return this.window.width < width
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    showMoreInfo(row) {
      this.moreInfoData = row
      this.$modal.show('more-info')
    },
    daysFilterFn(data, filterString) {
      var filterStrings = ['MWF', 'TTh', 'M-F','M', 'Tu', 'W', 'Th', 'F']
      return filterString === 'Other' ? !filterStrings.includes(data) : data === filterString
    },
    numFilterFn(data ,filterString) {
      return data.toString()[0] === filterString[0]
    },
    timesFilterFn(data, filterString) {
      data = data.split(',')
      data = data.join('-')
      data = data.split('-')
      data = data.filter((elem, idx) => {
        return idx % 2 === 0;
      })
      data = data.join(':')
      data = data.split(':')
      data = data.filter((elem, idx) => {
        return idx % 2 === 0;
      })
      return data.includes(filterString)
    },
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
    /* Get Stolaf Courses from backend API */
    getStolafTableRows() {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var type = this.selectedValues.type
      var term = `${year}${semester}`
      this.coursesUnavailable = false;

      axios.get(`api/courses?term=${term}&type=${type}`).then(response => {
        this.stolafTableRows = response.data.courses
        if(this.stolafTableRows.length === 0) {
          this.coursesUnavailable = true;
        }
      })
    },
    /* Get User Courses from backend API */
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

#up-button-circle {
  background: orange;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  top: 25px;
  right: 50%;
  z-index: 99;
}

#up-arrow-icon2 {
  color: white;
  margin-top: 12px;
}

#up-arrow-icon {
  color: white;
  margin-top: 12px;
}

#up-arrow-circle {
  margin: 0px auto;
  background: orange;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 50%;
}

#contact-middle-top1 {
  margin-bottom: 12px;
}

#contact-middle-top2 {
  margin-bottom: 19px;
}

#back-to-top {
  line-height: 30px;
  margin-top: 50px;
  color: white;
  text-decoration: underline;
}

#my-contacts {
  /*padding: 30px;*/
  padding-top: 15px;
  color: #eee;
}

#logo-list {
/*  width: 50%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;*/
  margin-left: 20px;
}
/**/
#contact {
  color: white;
  height: 100px;
  padding-top: 15px;
}

#contact-container {
  /*background: blue;*/
  display: flex;
  width: 240px;
  margin: 0px auto;
}

#contact-left {
  margin-right: 20px;
  text-align: left;
}

#contact-middle {
  margin-right: 20px;
}


#body-container {
  padding: 0 5%;
}


#desktop {
  padding-top: 50px;
}

#reset-filters-btn {
  top: 32px;
}

#website-header {
  padding: 20px 20px;
  max-width: 1000px;
  margin: 0px auto;
  margin-bottom: 70px;
  margin-top: 70px;
  width: 100%;
  border-radius: 10px;
}

.website-header-title {
  margin-bottom: 20px;
  color: white;
  font-size: 40px;
}

.my-options {
  font-size: 30px !important;
  background: blue !important;
}

#header {
  font-size: 30px;
  margin-bottom: 10px;
}

.mobile-button {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}

#mobile-buttons {
  /*display: flex;*/
  /*background: blue;*/
  /*justify-content: space-between;*/
}

#mobile {
  padding: 30px;
}

#hide-options-container {
  padding: 10px 30px;
}

#top-section-selectors {
  margin: 0px auto;
  /*width: 300px;*/
}

#top-section-selectors * {
  text-align: center;
  margin-bottom: 5px;
}



#top-section-selectors button {
  border-radius: 5px;
}

#user-section {
  margin: 0px auto;
  max-width: 1000px;
  margin-bottom: 70px;
}

#stolaf-section {
  max-width: 1000px;
  margin: 0px auto;
  margin-bottom: 750px;
}

#user-courses-table-options {
  padding: 20px;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 70px;
  border-radius: 5px;
}

#user-courses-table-options * {
  text-align: center;
  margin-bottom: 5px;
}

#stolaf-courses-table-options {
  padding: 20px;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 70px;
  border-radius: 5px;
}

#stolaf-courses-table-options * {
  text-align: center;
}


</style>

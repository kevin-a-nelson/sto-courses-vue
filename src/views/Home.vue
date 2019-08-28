<template>
  <div class="home">
    <div id="top-section">
      <div id="top-section-selectors">
        <year-selector v-on:newYearSelected="updateSelectedValuesAndRows"/>
        <semester-selector v-on:newSemesterSelected="updateSelectedValuesAndRows"/>
        <button>Columns</button>
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

export default {
  name: 'home',
  components: {
    StolafCoursesTable,
    YearSelector,
    UserCoursesTable,
    SemesterSelector,
    DraftSelector,
    TypeSelector
  },
  created() {
    this.getStolafTableRows()
    this.getUserTableRows()
  },
  data() {
    return {
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
    test() {
      console.log('test worked')
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

      console.log('hello')

      axios.get(`api/terms?term=${term}&order=${draft}`).then(response => {
        this.userTableRows = response.data[0].courses
      })
    }
  }
}
</script>

<style>

#top-section-selectors {
  margin: 10px auto 0 auto;
  display: flex;
  width: 325px;
  justify-content: space-between;
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

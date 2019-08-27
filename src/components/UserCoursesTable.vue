<template>
  <div id="user-courses-table">
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'">
          <button v-on:click="moreInfo(props.row)">View</button>
          <button v-on:click="removeCourse(props.row.id)">Remove</button>
        </div>
      </template>
    </vue-good-table>
    <more-info-modal v-bind:moreInfoData="moreInfoData"/>
  </div>
</template>

<script>
import axios from 'axios'
import columns from './Columns.js'
import MoreInfoModal from './MoreInfoModal.vue'
import YearSelector from './YearSelector.vue'
import SemesterSelector from './SemesterSelector.vue'
import DraftSelector from './DraftSelector.vue'
import HideOptions from './HideOptions.vue'

export default {
  name: 'user-courses-table',
  components: {
    DraftSelector,
    MoreInfoModal,
    YearSelector,
    SemesterSelector,
    HideOptions
  },
  created() {
    this.getSelectedValues()
    this.getUserTermCourses()
  },
  data() {
    return {
      columns: columns,
      selectedValues: {
        year: '',
        semester: '',
        draft: '',
        type: '',
      },
      moreInfoData: {
        description: '',
        prereqs: '',
        notes: '',
        prof: ''
      },
      rows: [],
    }
  },
  methods: {
    getSelectedValues() {
      var query = this.$route.query
      this.selectedValues.year = query.year || 2019
      this.selectedValues.semester = query.semester || 1
      this.selectedValues.draft = query.draft || 1
      this.selectedValues.type = query.type || 'class'
    },
    setSelectedValue(key, value) {
      this.selectedValues[key] = value
      this.getUserTermCourses()
    },
    moreInfo(row) {
      this.moreInfoData.description = row.description
      this.moreInfoData.prereqs = row.prereqs
      this.moreInfoData.notes = row.notes
      this.moreInfoData.prof = row.prof
      this.$modal.show('more-info')
    },
    url() {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var type = this.selectedValues.type

      return `/?year=${year}&semester=${semester}&type=${type}&draft=${draft}`
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
    removeCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.getUserTermCourses()
      })
    }
  }
}
</script>

<style>

/*#user-courses-table {
  margin: 30px;
}*/
</style>

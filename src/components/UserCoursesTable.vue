<template>
  <div id="user-courses-table">
    <vue-good-table
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'" class="action-buttons">
          <b-button v-on:click="showMoreInfo(props.row)" class="action-button" type="is-info">
            <eye-icon /> 
          </b-button>
          <b-button v-on:click="removeCourse(props.row.id)" class="action-button" type="is-info">
            <plus-icon />
          </b-button>
        </div>
      </template>
      <template slot="table-column" slot-scope="props">
         <span v-if="props.column.label =='Actions'">
            {{ props.column.label }}
            <button>=></button>
         </span>
         <span v-else>
            {{props.column.label}}
         </span>
      </template>
    </vue-good-table>
    <!-- <more-info-modal v-bind:moreInfoData="moreInfoData"/> -->
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
  props: ['rows', 'selectedValues', 'columns'],
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
    return {}
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
    },
    showMoreInfo(row) {
      this.$emit('showMoreInfo', row)
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

.action-button {
  margin: 3px;
}

.action-buttons {
  min-width: 120px;
}

/*#user-courses-table {
  margin: 30px;
}*/
</style>

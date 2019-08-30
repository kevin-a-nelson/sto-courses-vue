<template>
  <div id="user-courses-table">
    <vue-good-table
      theme="nocturnal"
      :columns="columns"
      :rows="rows">
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'" class="action-buttons">
          <b-button v-on:click="showMoreInfo(props.row)" class="action-button" type="is-info">
            <eye-icon /> 
          </b-button>
          <b-button v-on:click="removeCourse(props.row.id)" class="action-button" type="is-info">
            <span style="color: black;">X</span>
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
          <span v-if="props.row.difficulty == 0" style="color: #167df0;">N/A</span>
          <span v-else-if="props.row.difficulty <= 0" style="color: red;">{{ props.row.difficulty }} </span>
          <span v-else-if="props.row.difficulty <= 2" style="color: orange;">{{ props.row.difficulty }} </span>
          <span v-else-if="props.row.difficulty <= 3" style="color: orange;">{{ props.row.difficulty }} </span>
          <span v-else-if="props.row.difficulty <= 4" style="color: green;">{{ props.row.difficulty }} </span>
        </div>
        <div v-else-if="props.column.label == 'Reviews'" style="font-size: 30px; text-align: center; font-weight: 900;">
          <span v-if="props.row.reviews == 0" style="color: #167df0;">N/A</span>
          <span v-else-if="props.row.reviews >= 20" style="color: green;">{{ props.row.reviews }} </span>
          <span v-else-if="props.row.reviews >= 15" style="color: orange;">{{ props.row.reviews }} </span>
          <span v-else-if="props.row.reviews >= 5" style="color: orange;">{{ props.row.reviews }} </span>
          <span v-else-if="props.row.reviews >= 0" style="color: red;">{{ props.row.reviews }} </span>
          <span v-else style="color: green;">{{ props.row.reviews }} </span>
        </div>
        <span v-else style="font-weight: 900;">
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <template slot="table-column" slot-scope="props">
         <span v-if="props.column.label =='Actions'" style="font-weight: 900;">
            {{ props.column.label }}
         </span>
         <span v-else style="font-weight: 900;">
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
  min-width: 150px;
}

/*#user-courses-table {
  margin: 30px;
}*/
</style>

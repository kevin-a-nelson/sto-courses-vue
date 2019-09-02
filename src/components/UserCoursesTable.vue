<template>
  <div id="user-courses-table" 
      ref="myTable"
      class="my-opacity"
      @mouseover="updateActionButtonsPosition"
      @mouseleave="hideActionButtons">
    <vue-good-table
      @on-row-mouseenter="onRowMouseOver"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table condensed fall-background-color"
      >
      <template slot="table-row" slot-scope="props">
<!--         <div v-if="props.column.field == 'prof'" style="font-weight: 600;">
            <a v-if="props.row.prof_url"
               target="_blank"
               :href="`${props.row.prof_url}`"
               style="color: #167df0; text-decoration: underline;">
               {{ props.row.prof }}
            </a>
            <span v-else>
              {{ props.row.prof }}
            </span>
        </div> -->
<!--         <div v-else-if="props.column.field == 'status'" style="font-size: 30px; text-align: center; font-weight: 900;">
          <span v-if="props.row.status === 'C'" class="red">{{ props.row.status }}</span>
          <span v-else class="green">{{ props.row.status }}</span>
        </div>
        <div v-else-if="props.column.field == 'rating'" style="font-size: 30px; text-align: center; font-weight: 900;">
          <span v-if="props.row.rating == 0" class="my-blue">N/A</span>
          <span v-else :class="ratingColor(props.row.rating)">{{ props.row.rating }}</span>
        </div>
        <div v-else-if="props.column.field == 'difficulty'" style="font-size: 30px; text-align: center; font-weight: 900;">
          <span v-if="props.row.rating == 0" class="my-blue">N/A</span>
          <span v-else :class="difficultyColor(props.row.difficulty)">{{ props.row.difficulty }}</span>
        </div>
        <div v-else-if="props.column.label == 'Reviews'" style="font-size: 30px; text-align: center; font-weight: 900;">
          <span v-if="props.row.reviews == 0" class="my-blue">N/A</span>
          <span v-else :class="reviewsColor(props.row.reviews)"> {{ props.row.reviews }}</span>
        </div> -->
<!--         <span v-if="props.column.label==='status'" style="text-align: center;">
          {{props.formattedRow[props.column.field]}}
        </span> -->
        <div v-if="props.column.label==='Status'" style="font-weight: 700; font-size: 15px; text-align: center; line-height: 50px;">
          <span>
            {{props.formattedRow[props.column.field]}}
          </span>
        </div>
        <span v-else style="font-weight: 700; font-size: 15px;">
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <template slot="table-column" slot-scope="props">
        <div style="width: 40px;">
         <span style="font-weight: 900;">
            {{props.column.label}}
         </span>
        </div>
      </template>
    </vue-good-table>
    <div>
      <button @click="removeCourse" class="user-action-btn" ref="removeBtn"><plus-icon /></button>
    </div>
    <div>
      <button @click="showMoreInfo" class="user-action-btn" ref="infoBtn"><eye-icon /></button>
    </div>
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
    return {
      hoveredRow: ''
    }
  },
  methods: {
    updateActionButtonsPosition(event) {
      var y = event.pageY

      var infoBtn = this.$refs.infoBtn
      var removeBtn = this.$refs.removeBtn

      var myTable = this.$refs.myTable.getBoundingClientRect()
      var myTableY = myTable.y
      var myTableWidth = myTable.width
      var myTableBegin = myTable.x
      var myTableEnd = myTableBegin + myTableWidth

      var clientY = event.clientY

      if(clientY - myTableY < 50) {
        this.hideActionButtons()
        return
      }

      removeBtn.setAttribute('style', `top: ${y - 25}px; left: ${myTableBegin - 25}px;`)
      infoBtn.setAttribute('style', `top: ${y - 25}px; left: ${myTableEnd - 25}px;`)

    },
    hideActionButtons() {
      var infoBtn = this.$refs.infoBtn
      var removeBtn = this.$refs.removeBtn

      infoBtn.setAttribute('style', 'visibility: hidden;')
      removeBtn.setAttribute('style', 'visibility: hidden;')
    },
    onRowMouseOver(props) {
      this.hoveredRow = props.row
    },
    hoveredOverRow(props) {
      return this.hoveredRowId === props.row.id
    },
    ratingColor(rating) {
      rating = Number(rating)
      var color = 'red'
      if (rating < 2) {
        color = 'red'
      } else if(rating < 4) {
        color = 'orange'
      } else if (rating <= 5) {
        color = 'green'
      }
      return color
    },
    difficultyColor(difficulty) {
      difficulty = Number(difficulty)
      var color = 'red'
      if(difficulty < 2) {
        color = 'green'
      } else if (difficulty < 4) {
        color = 'orange'
      } else if (difficulty <= 5) {
        color = 'red'
      }
      return color
    },
    reviewsColor(reviews) {
      reviews = Number(reviews)
      var color = 'red'
      if(reviews < 10) {
        color = 'red'
      } else if (reviews < 20) {
        color = 'orange'
      } else {
        color = 'green'
      }
      return color
    },
    removeCourse() {
      var course_id = this.hoveredRow.id
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.$emit('rowsChanged')
      }).catch(error => {
      })
    },
    showMoreInfo() {
      this.$emit('showMoreInfo', this.hoveredRow)
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

.user-action-btn {
  height: 50px;
  width: 50px;
  position: absolute;
  border-radius: 5px;
  border: none;
  top: 0px;
}

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

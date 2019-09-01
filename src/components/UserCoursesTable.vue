<template>
  <div id="user-courses-table" 
      ref="myTable"
      class="my-opacity"
      @mouseover="updateActionButtonsPosition"
      @mouseleave="hideActionButtons">
    <vue-good-table
      @on-row-mouseenter="onRowMouseover"
      @on-row-mouseleave="onRowMouseleave"
      theme="nocturnal"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table condensed bordered"
      >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'actions'" class="action-buttons">
          <div v-if="hoveredOverRow(props)">
            <b-button v-on:click="showMoreInfo(props.row)" class="action-button" type="is-info">
              <eye-icon /> 
            </b-button>
            <b-button v-on:click="removeCourse(props.row.id)" class="action-button" type="is-info">
              <span style="color: black;">X</span>
            </b-button>
          </div>
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
    <div>
      <button class="user-action-button" ref="removeBtn"><plus-icon /></button>
    </div>
    <div>
      <button class="user-action-button" ref="infoBtn"><eye-icon /></button>
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
      hoveredRowId: ''
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
      console.log(clientY - myTableY)

      if(clientY - myTableY < 50) {
        this.hideActionButtons()
        return
      }

      infoBtn.setAttribute('style', `top: ${y - 25}px; left: ${myTableBegin - 25}px;`)
      removeBtn.setAttribute('style', `top: ${y - 25}px; left: ${myTableEnd - 25}px;`)

    },
    hideActionButtons() {
      var infoBtn = this.$refs.infoBtn
      var removeBtn = this.$refs.removeBtn

      infoBtn.setAttribute('style', 'visibility: hidden;')
      removeBtn.setAttribute('style', 'visibility: hidden;')
    },
    onRowMouseleave(props) {
      this.hoveredRowId = ''
    },
    onRowMouseOver(props) {
      this.hoveredRow = props.row
    },
    hoveredOverRow(props) {
      return this.hoveredRowId === props.row.id
    },
    onRowMouseover(props) {
      this.hoveredRowId = props.row.id
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

.user-action-button {
  height: 50px;
  width: 50px;
  position: absolute;
  background: #167df0;
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

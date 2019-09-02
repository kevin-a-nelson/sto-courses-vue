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
        <div :style="greyOrWhite()">
          <div v-if="props.column.label==='Prof'" class="my-row">
            {{ props.formattedRow[props.column.field]}}
          </div>
          <div v-if="props.column.label==='Status'" class="my-row status-column">
            <span>
              {{props.formattedRow[props.column.field]}}
            </span>
          </div>
          <span v-else class="my-row">
            {{props.formattedRow[props.column.field]}}
          </span>
        </div>
      </template>
      <template slot="table-column" slot-scope="props">
        <div :style="greyOrWhite()"> 
          <div style="width: 40px;">
           <span style="font-weight: 900;">
              {{props.column.label}}
           </span>
          </div>
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
    greyOrWhite() {
      return [4,5].includes(this.selectedValues.semester) ? 'color: #BEBEBE;' : 'color: white;'
    },
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
    removeCourse(course_id) {
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      axios.delete(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`).then(response => {
        this.$emit('rowsChanged')
      })
    }
}
</script>

<style>

.status-column {
  text-align: center; 
  line-height: 50px;
}

.my-row {
  font-size: 15px;
  font-weight: 700;
}

.user-action-btn {
  height: 50px;
  width: 50px;
  position: absolute;
  border-radius: 5px;
  border: none;
  top: -200px;
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

<template>
  <div id="stolaf-courses-table"
    @mouseleave="onMouseLeave"
    ref="stolafTable"
    class="my-opacity"
    @mouseover="updateMousePosition"
    >
    <!-- Notifications -->
    <notifications group="foo" position="top right"/>
    <!-- Table -->
    <vue-good-table
      theme="blue;"
      @on-row-mouseenter="onRowMouseover"
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed fall-background-color"
      :pagination-options="paginationOptions"
      :sort-options="{
        initialSortBy: [
          { field: 'rating', type: 'desc' },
          { field: 'reviews', type: 'desc' }
        ]
      }"
      >
    <!-- Table Modifileications -->
      <template slot="table-row" slot-scope="props">
    <!-- Actions Column -->
        <div>
<!--           <div v-else-if="props.column.field == 'prof'" style="font-weight: 600;">
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
<!--           <div v-else-if="props.column.field == 'status'" style="font-size: 30px; text-align: center; font-weight: 900;" ref="statusColumn">
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
          <div v-if="props.column.label==='Status'" style="font-weight: 700; font-size: 15px; text-align: center; line-height: 50px;">
            <span>
              {{props.formattedRow[props.column.field]}}
            </span>
          </div>
          <span v-else-if="props.column.label === 'Rating'" style="font-weight: 700; font-size: 15px;">
            {{props.formattedRow[props.column.field]}}
          </span>
          <span v-else style="font-weight: 700; font-size: 15px;">
            {{props.formattedRow[props.column.field]}}
          </span>
        </div>
      </template>
      <template slot="table-column" slot-scope="props">
        <div v-if="props.column.label === 'Status'" ref="statusHeader" style="width: 40px;">
          {{ props.column.label }}
        </div>
        <div v-else-if="props.column.label === 'Reviews'" ref="reviewsHeader" style="width: 40px;">
          {{ props.column.label }}
        </div>
        <div v-else class="my-column">
          <span style="font-weight: 900; ">
            {{ props.column.label }}
          </span>
        </div>
      </template>
    </vue-good-table>
    <div>
      <button @click="addCourse" class="absolute-table-btn" ref="AddBtn"><plus-icon /></button>
    </div>
    <div>
      <button @click="moreInfo" class="absolute-table-btn" ref="InfoBtn"><eye-icon /></button>
    </div>
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
import Plus from '@/assets/plus.png'
import Logo from '@/assets/logo.png'

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
  data() {
    return {
      mousePos: {
        x: 0,
        y: 0,
      },
      hoveredRow: '',
      paginationOptions: {
        enabled: true,
        mode: 'pages',
        perPage: 5,
        position: 'top',
        perPageDropdown: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        dropdownAllowAll: true,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      },
      moreInfoData: {
        name: '',
        description: '',
        prereqs: '',
        notes: '',
        prof: '',
        prof_url: ''
      },
      notificationType: '',
      columnNum: 1,
      showActionButtons: false
    }
  },
  methods: {
    addCourseBtnPosition() {
      var style = 
      `background: red; position: absolute; width: 100px; height: 100px; top: ${this.y}px;`
      return style
    },
    onMouseLeave(props) {
      this.hideActionButtons()
    },
    onRowMouseover(props) {
      this.hoveredRow = props.row
    },
    updateMousePosition(event) {

      this.x = event.pageX
      this.y = event.pageY
      
      var reviewsHeaderX = this.$refs.reviewsHeader.getBoundingClientRect().x

      var statusHeader = this.$refs.statusHeader.getBoundingClientRect()
      var statusHeaderX = statusHeader.x
      var statusHeaderY = statusHeader.y


      var stolafTable = this.$refs.stolafTable.getBoundingClientRect()
      var stolafTableBegin = stolafTable.x
      var stolafTableWidth = stolafTable.width
      var stolafTableEnd = stolafTableWidth + stolafTableBegin

      var addBtn = this.$refs.AddBtn
      var infoBtn = this.$refs.InfoBtn

      if(event.clientY - statusHeaderY > 100) {
        addBtn.setAttribute('style',
          `top: ${this.y - 25}px;
           left: ${stolafTableBegin - 25}px;`
        )
        infoBtn.setAttribute('style',
          `top: ${this.y - 25 }px;
           left: ${stolafTableEnd - 25}px;`
        )
      } else {
        this.hideActionButtons()
      }
    },
    hideActionButtons() {
      var addBtn = this.$refs.AddBtn
      var infoBtn = this.$refs.InfoBtn

      addBtn.setAttribute('style',
        `visibility: hidden;`
      )
      infoBtn.setAttribute('style',
        `visibility: hidden;`
      )
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
    addCourse() {
      var course_id = this.hoveredRow.id
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      var course_name = this.hoveredRow.name
      var semesterStr = this.intSemesterToStr(semester)
      var text = `Added ${course_name} to ${semesterStr} ${year} Draft ${draft}`

      axios.post(`api/course_terms?term=${term}&order=${draft}&course_id=${course_id}`)
           .then(response => {
              // this.showNotification('foo', 'success' , text)
              this.$emit('rowsChanged')
           })
           .catch(error => {
              this.showNotification('foo', 'error' , 'You already have that course')
           })
    },
    moreInfo() {
      this.$emit('showMoreInfo', this.hoveredRow)
    },
    showNotification(group, type, text) {
      this.$notify({
        group: group,
        type: type,
        text: text
      });
    },
    intSemesterToStr(semesterInt) {
      var semesterStr = ''
      switch(semesterInt) {
        case 1:
          semesterStr = 'Fall'
          break;
        case 2:
          semesterStr = 'Interim'
          break;
        case 3:
          semesterStr = 'Spring'
          break;
        case 4:
          semesterStr = 'Summer Session 1'
          break;
        case 5:
          semesterStr = 'Summer Session 2'
          break;
      }
      return semesterStr
    },
  }
}
</script>

<style>

.absolute-table-btn {
  height: 50px;
  width: 50px;
  position: absolute;
  background: #167df0;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  border-radius: 5px;
  border: none;
  top: 0px;
}

.my-column {
  width: 40px;
}



.action-button {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  line-height: 0px;
}
  
</style>


<template>
  <div id="stolaf-courses-table" class="my-opacity">
    <!-- Notifications -->
    <notifications group="foo" position="top right"/>
    <!-- Table -->
    <vue-good-table
      @on-row-mouseenter="onRowMouseover"
      theme="nocturnal"
      :columns="columns"
      :rows="rows"
      :fixed-header="false"
      styleClass="vgt-table condensed bordered"
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
          <div v-if="props.column.field == 'actions'" style="min-width: 115px;">
            <div v-if="hoveredRowId === props.row.id">
              <b-button class="action-button" type="is-info" v-on:click="moreInfo(props.row)">
                <eye-icon /> 
              </b-button>
              <b-button class="action-button" type="is-info" v-on:click="addCourse(props.row)" >
                <plus-icon />
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
        </div>
      </template>
      <template slot="table-column" slot-scope="props">
        <span style="font-weight: 900;">
          {{ props.column.label }}
        </span>
      </template>
    </vue-good-table>
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
      hoveredRowId: '',
      paginationOptions: {
        enabled: false,
        mode: 'pages',
        perPage: 1000,
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
      columnNum: 1
    }
  },
  methods: {
    mousedOverRow(rowId) {
      return this.hoveredRowId === rowId
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
    addCourse(row) {
      var course_id = row.id
      var year = this.selectedValues.year
      var semester = this.selectedValues.semester
      var draft = this.selectedValues.draft
      var term = `${year}${semester}`

      var course_name = row.name
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
    moreInfo(row) {
      this.$emit('showMoreInfo', row)
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

.action-button {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  line-height: 0px;
}
  
</style>


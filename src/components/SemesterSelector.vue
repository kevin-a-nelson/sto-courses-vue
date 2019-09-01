<template>
  <div>
    <form>
      <b-select v-model="selectedSemester"
                @input="newSemesterSelected">
        <option v-for="semester in semesters"
                :value="semester.value">
          {{ semester.text }}
        </option>
      </b-select>
    </form>
  </div>
</template>

<script>
export default {
  name: 'semester-selector',
  data() {
    return {
      selectedSemester: 1,
      semesters: [
        { text: 'Fall', value: 1 },
        { text: 'Interim', value: 2 },
        { text: 'Spring', value: 3 },
        { text: 'Summer Session 1', value: 4 },
        { text: 'Summer Session 2', value: 5 },
      ],
      tables: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      modal: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      header: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      app: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      myCourses: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      stolafCourses: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      stolafActionBtns: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      userActionBtns: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      paginationFooter: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      navbar: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      contact: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      backgroundImage: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ]
    }
  },
  methods: {
    created() {
    },
    newSemesterSelected() {
      this.$emit('newSemesterSelected', 'semester' , this.selectedSemester)
      this.changeSeasonTheme(this.selectedSemester)
    },


    changeSeasonTheme(semester) {
      var tables = document.getElementsByTagName('table')
      var modal = document.getElementsByTagName('more-info-modal')
      var header = document.getElementById('website-header')
      var app = document.getElementById('app')
      var myCourses = document.getElementById('user-courses-table-options')
      var stolafCourses = document.getElementById('stolaf-courses-table-options')
      var stolafActionBtns = document.getElementsByClassName('stolaf-table-btn')
      var userActionBtns = document.getElementsByClassName('user-action-btn')
      var paginationFooter = document.getElementsByClassName('vgt-wrap__footer')
      var navbar = document.getElementsByClassName('navbar')[0]
      var contact = document.getElementById('contact')

      console.log(tables[0])
      tables[0].style.background = 'blue !important'
      console.log(tables[0].style.background = "blue")

      header.style.background = 'blue'

      // this.changeElementSeason(season, stolafActionBtns[0])
      // this.changeElementSeason(season, stolafActionBtns[1])
      // this.changeElementSeason(season, userActionBtns[0])
      // this.changeElementSeason(season, userActionBtns[1])
      // this.changeElementSeason(season, tables[0])
      // this.changeElementSeason(season, tables[1])
      // this.changeElementSeason(season, paginationFooter[0])
      // this.changeElementSeason(season, header)
      // this.changeElementSeason(season, stolafCourses)
      // this.changeElementSeason(season, myCourses)
      // this.changeElementSeason(season, navbar)
      // this.changeElementSeason(season, contact)
      // this.changeBackgroundImage(season, app)
    },
    changeElementSeason(season, element) {
      var seasonBackground = [
        'fall',
        'winter',
        'spring',
        'summer1',
        'summer2'
      ]
      element.style.background = this.seasonBackgrounds[season + 1]
    },
    changeTableSeason(season, element) {
      var tableBackground = [
        'fall',
        'winter',
        'spring',
        'summer1',
        'summer2'
      ]
      element.style.background = tableBackground[season + 1]
    },
    changeBackgroundImage(inputSeason, element) {
      var seasonBackgrounds = ['winter-img', 'fall-img', 'spring-img', 'summerOne-img', 'summerTwo-img']
      seasonBackgrounds.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(this.seasonBackgroundImages[inputSeason])
    },
  }
}
</script>
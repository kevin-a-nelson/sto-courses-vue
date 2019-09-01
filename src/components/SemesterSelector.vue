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
      seasonBackgroundColors: {
        winter: 'winter-background-color',
        fall: 'fall-background-color'
      },
      seasonBackgroundImages: {
        winter: 'winter-background-image',
        fall: 'fall-background-image'
      },
      seasonBorderColors: {
        winter: 'lightblue',
        fall: 'orange'
      }
    }
  },
  methods: {
    newSemesterSelected() {
      this.$emit('newSemesterSelected', 'semester' , this.selectedSemester)
      var season = this.semesterToSeason(this.selectedSemester)
      this.changeSeasonTheme(season)
    },
    semesterToSeason(semester) {
      var season = ''
      switch(semester) {
        case 1:
          season = 'fall'
          break;
        case 2:
          season = 'winter'
          break;
        case 3:
          season = 'spring'
          break;
        default:
          season = 'fall'
      }
      return season
    },
    changeSeasonTheme(season) {
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
      var tr = document.getElementsByTagName('tr')
      var td = document.getElementsByTagName('td')

      // this.changeElementsBorder(season, tr)
      // this.changeElementsBorder(season, td)
      this.changeElementSeason(season, stolafActionBtns[0])
      this.changeElementSeason(season, stolafActionBtns[1])
      this.changeElementSeason(season, userActionBtns[0])
      this.changeElementSeason(season, userActionBtns[1])
      this.changeElementSeason(season, tables[0])
      this.changeElementSeason(season, tables[1])
      this.changeElementSeason(season, paginationFooter[0])
      this.changeElementSeason(season, header)
      this.changeElementSeason(season, stolafCourses)
      this.changeElementSeason(season, myCourses)
      this.changeElementSeason(season, navbar)
      this.changeElementSeason(season, contact)
      this.changeElementSeasonImage(season, app)
    },
    changeElementSeason(inputSeason, element) {
      var seasonBackgrounds = ['winter-background-color', 'fall-background-color']
      seasonBackgrounds.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(this.seasonBackgroundColors[inputSeason])
    },
    changeElementSeasonImage(inputSeason, element) {
      var seasonBackgrounds = ['winter-background-image', 'fall-background-image']
      seasonBackgrounds.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(this.seasonBackgroundImages[inputSeason])
    },
    changeElementsBorder(season, elements) {
      var borderColor = `solid ${this.seasonBorderColors[season]} !important`
      for(var i = 0; i < elements.length; i++) {
        elements[i].classList.add('solid-orange')
      }
    }
  }
}
</script>
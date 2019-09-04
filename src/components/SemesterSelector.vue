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
      <b-switch v-model="nightMode" @input="modeChanged"><p id="night-mode-text">Night Mode</p></b-switch>
    </form>
  </div>
</template>

<script>
export default {
  name: 'semester-selector',
  data() {
    return {
      nightMode: false,
      semesters: [
        { text: 'Fall', value: 1 },
        { text: 'Interim', value: 2 },
        { text: 'Spring', value: 3 },
        { text: 'Summer Session 1', value: 4 },
        { text: 'Summer Session 2', value: 5 },
      ],
      selectedSemester: 1,
      navbar: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
      header: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
      myCourses: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
      tables1: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(to bottom, #3eadcf, #3eadcf, #3eadcf, #3eadcf, #3eadcf)",                               
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", 
        "transparent",
        "transparent",
        "transparent",
      ],
      stolafCourses: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
      pagination: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
        // "#FFA500",
      tables2: [
        "linear-gradient(315deg, #ff8000 0%, #ec9f05 74%)",
        "linear-gradient(to bottom, #3eadcf, #3eadcf, #3eadcf, #3eadcf, #3eadcf)",
        "linear-gradient(to bottom, #ff8177, #fe857a, #fc897e, #fb8d81, #f99185)",
        "transparent",
        "transparent",
        "transparent",
      ],
      contact: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "transparent",
        "transparent",
        "transparent",
      ],
      actionBtnClasses: [
        'fall-btn',
        'interim-btn',
        'spring-btn',
        'summer1-btn',
        'summer2-btn',
        'night-mode-btn'
      ],
      backgroundImages: [
        'fall-img',
        'winter-img',
        'spring-img',
        'summer-one-img',
        'summer-two-img',
        'night-mode-img',
      ]
    }
  },
  mounted() {
    this.changeSeasonTheme(1)
  },
  methods: {
    modeChanged() {
      this.nightMode ? this.changeSeasonTheme(5) : this.changeSeasonTheme(this.selectedSemester)
      this.$emit('newModeSelected', this.nightMode)
    },
    newSemesterSelected() {
      this.$emit('newSemesterSelected', 'semester' , this.selectedSemester)
      this.changeSeasonTheme(this.selectedSemester)
    },
    changeElementsStyle(elements, styleName, styling) {
      for(var i = 0; i < elements.length; i++) {
        elements[i].style[styleName] = styling
        elements[i].style[styleName] = styling
      }
    },
    changeSeasonTheme(semester) {
      if(this.nightMode) {
        semester = 6
      }

      // Get Elements
      var app = document.getElementById('app')
      var tables = document.getElementsByTagName('table')
      var header = document.getElementById('website-header')
      var myCourses = document.getElementById('user-courses-table-options')
      var stolafCourses = document.getElementById('stolaf-courses-table-options')
      var stolafActionBtns = document.getElementsByClassName('stolaf-table-btn')
      var userActionBtns = document.getElementsByClassName('user-action-btn')
      var pagination = document.getElementsByClassName('vgt-wrap__footer')
      var navbar = document.getElementsByClassName('navbar')
      var contact = document.getElementById('contact')
      var upArrowCircle = document.getElementById('up-arrow-circle')
      var tableColumns = document.getElementsByClassName("table-columns")
      var tableRows = document.getElementsByClassName("table-rows")
      var vgtSelect = document.getElementsByClassName("vgt-select")
      var vgtInput = document.getElementsByClassName("vgt-input")


      semester -= 1

      // Set style of elements 
      tables[0].style.background = this.tables1[semester]
      tables[1].style.background = this.tables2[semester]
      header.style.background = this.header[semester]
      myCourses.style.background = this.myCourses[semester]
      stolafCourses.style.background = this.stolafCourses[semester]
      pagination[0].style.background = this.pagination[semester]
      navbar[0].style.background = this.navbar[semester]
      contact.style.background = this.contact[semester]
      upArrowCircle.style.background = this.contact[semester]

      if(this.nightMode) {
        this.changeElementsStyle(vgtSelect, 'backgroundColor', '#BEBEBE')
        this.changeElementsStyle(vgtInput, 'background', '#BEBEBE')
        this.changeElementsStyle(vgtSelect, 'color', 'black')
        this.changeElementsStyle(vgtInput, 'color', 'black')

        this.changeElementsStyle(tableColumns, 'color', '#BEBEBE')
        this.changeElementsStyle(tableRows, 'color', '#BEBEBE')
      } else {
        this.changeElementsStyle(vgtSelect, 'backgroundColor', 'white')
        this.changeElementsStyle(vgtInput, 'background', 'white')
        this.changeElementsStyle(tableColumns, 'color', 'white')
        this.changeElementsStyle(tableRows, 'color', 'white')
        this.changeElementsStyle(vgtSelect, 'color', '#606266')
        this.changeElementsStyle(vgtInput, 'color', '#606266')
      }

      // Set classes of elements
      this.addSeasonClass(semester, stolafActionBtns[0], this.actionBtnClasses)
      this.addSeasonClass(semester, stolafActionBtns[1], this.actionBtnClasses)
      this.addSeasonClass(semester, userActionBtns[0], this.actionBtnClasses)
      this.addSeasonClass(semester, userActionBtns[1], this.actionBtnClasses)

      this.addSeasonClass(semester, app, this.backgroundImages)
    },
    addSeasonClass(semester, element, listOfClasses) {
      listOfClasses.forEach(season => {
        if (element.classList.contains(season)) {
          element.classList.remove(season); 
        }
      })
      element.classList.add(listOfClasses[semester])
    },
  }
}
</script>

<style>

.grey-font {
  color: #BEBEBE !important;
}

#night-mode-text {
  font-weight: 500;
  color: white;
}

.fall-btn {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)
}
.interim-btn {
  background: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);
}
.spring-btn {
  background: linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
}
.summer1-btn {
  background: linear-gradient(147deg, #000000 0%, #04619f 74%);
  background-image: linear-gradient(147deg, #000000 0%, #04619f 74%) !important;
}
.summer2-btn {
  border: 1px solid black;
  background-color: #6c33a3;
  background-image: linear-gradient(316deg, #6c33a3 0%, #8241b8 74%);
}

.night-mode-btn {
  background: #BEBEBE;
}

.summer-one-img {
  background-image: linear-gradient(147deg, #000000 0%, #04619f 74%) !important;
}

.summer-two-img {
  background-color: #6c33a3;
  background-image: linear-gradient(316deg, #6c33a3 0%, #8241b8 74%) !important;
}

.night-mode-img {
  background: black !important;
}

.spring-img {
  background: url(https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2019/03/5c949b2d45ead_5c949a57947db_1937238489.jpg) no-repeat center center fixed !important;
  background: url(https://www.japan-guide.com/blog/sakura18/g/180406_fujigoko_21.jpg) no-repeat center center fixed !important;
  background: url(https://motaen.com/upload/wallpapers/source/2013/12/19/17/02/38525/W4VqZxTf7p.jpg) no-repeat center center fixed !important;
}

.winter-img {
  background: url(https://wallpaperbro.com/img/352195.jpg) no-repeat center center fixed !important;  
}

.fall-img {
  background: url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed !important; 
}

</style>
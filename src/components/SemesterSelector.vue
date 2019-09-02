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
      navbar: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #dffaff 0%, #1ebbf9 74%)",
        'purple',
      ],
      header: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #eeaeca 0%, #94bbe9 74%)",
        'purple',
      ],
      tables1: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",                                                      // Interem Color
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", // Spring Color
        "linear-gradient(315deg, #eeaeca 0%, #94bbe9 74%)", // Summer 1 Color
        'purple',                                                                                             // Summer 2 Color
      ],
      myCourses: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #eeaeca 0%, #94bbe9 74%)",
        'purple',
      ],
      stolafCourses: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #dffaff 0%, #1ebbf9 74%)",
        'purple',
      ],
      pagination: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #dffaff 0%, #1ebbf9 74%)",
        'purple',
      ],
      tables2: [
        "linear-gradient(to left, #ffa200, #fa9a05, #f5920a, #f08b0f, #eb8312)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #eeaeca 0%, #94bbe9 74%)",
        'purple',
      ],
      contact: [
        "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
        "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
        "linear-gradient(315deg, #dffaff 0%, #1ebbf9 74%)",
        'purple',
      ],
      app: [
        'url(https://i.pinimg.com/originals/83/ca/0b/83ca0bba91f42a2caf59abcb7cccd3b9.jpg) no-repeat center center fixed;',
        'url(https://i.pinimg.com/originals/83/ca/0b/83ca0bba91f42a2caf59abcb7cccd3b9.jpg) no-repeat center center fixed;',
        'url(https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2019/03/5c949b2d45ead_5c949a57947db_1937238489.jpg) no-repeat center center fixed;',
        'url(https://wallpaperbro.com/img/352195.jpg) no-repeat center center fixed;',
        'url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed;'
      ],
      actionBtnClasses: [
        'fall-btn',
        'interim-btn',
        'spring-btn',
        'summer1-btn',
        'summer2-btn'
      ],
      backgroundImages: [
        'fall-img',
        'winter-img',
        'spring-img',
        'summerOne-img',
        'summerTwo-img',
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

.fall-btn {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)
}
.interim-btn {
  background: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);
}
.spring-btn {
  background: orange;
}
.summer1-btn {
  background: green;
}
.summer2-btn {
  background: purple;
}

.summerOne-img {
  background: url(https://i.pinimg.com/originals/83/ca/0b/83ca0bba91f42a2caf59abcb7cccd3b9.jpg) no-repeat center center fixed;  
}
.summerTwo-img {
  background: url(https://i.pinimg.com/originals/83/ca/0b/83ca0bba91f42a2caf59abcb7cccd3b9.jpg) no-repeat center center fixed;   
}

.spring-img {
  background: url(https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2019/03/5c949b2d45ead_5c949a57947db_1937238489.jpg) no-repeat center center fixed;
}

.winter-img {
  background: url(https://wallpaperbro.com/img/352195.jpg) no-repeat center center fixed;  
}

.fall-img {
  background: url(https://wallpapercave.com/wp/wp3663415.jpg) no-repeat center center fixed; 
}

</style>
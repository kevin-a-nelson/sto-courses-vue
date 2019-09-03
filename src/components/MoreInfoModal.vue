<template>
  <div id="modal-outside-container">
    <modal name="more-info"
           width="60%"
           height="auto"
           style="margin-bottom: 0px;"
    >
        <div id="info-container" :class="currentSeason()" ref="modalRef">
          <div :class="isNightMode()">
            <div class="spacing">
              <h5 id="name">
                {{ moreInfoData.name }}
              </h5>
            </div>
            <div class="spacing" ref="testSpace">
              <h5 class="modal-label">Prereqs</h5>
                <p class="modal-p">{{ moreInfoData.prereqs }}</p>
            </div>
            <div class="spacing">
              <h5 class="modal-label">Description</h5>
              <p class="modal-p">{{ moreInfoData.description }}</p>
            </div>
            <div class="spacing">
              <h5 class="modal-label">Notes</h5>
              <p class="modal-p">{{ moreInfoData.notes }}</p>
            </div>
          </div>
        </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'more-info-modal',
  props: ['moreInfoData', 'modalName', 'nightMode'],
  methods: {
    close() {
      this.$modal.hide('more-info')
    },
    isNightMode() {
      console.log(this.nightMode)
      return this.nightMode ? 'night-theme' : 'day-theme'
    },
    nightThemeContainer() {
      return this.nightMode ? 'night-theme-container' : 'day-theme-container'
    },
    currentSeason() {
      var background = ''
      var app = document.getElementById('app').classList
      if(app.contains('fall-img')) {
        var background = 'fall-color'
      } else if (app.contains('winter-img')) {
        var background = 'winter-color'
      } else if (app.contains('spring-img')) {
        var background = 'spring-color'
      } else {
        var background = 'summer1-color'
      }

      if(this.nightMode) {
        background += ' night-theme-container'
      }
      return background
    }
  }, 
}
</script>

<style>

.winter-color {
  /*background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);*/
  background: linear-gradient(315deg, #abe9cd 0%, #3eadcf 30%);
}

.fall-color {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 30%);
  background: linear-gradient(315deg, #ec9f05 0%,#ff4e00 30%);
  background: linear-gradient(315deg, #ec9e05 0%, #ec6b05 30%);
  background: #ff8f00,
}

.night-theme {
  color: #BEBEBE;
}

.day-theme {
  color: white;
}

.night-theme-container {
  border: 2px solid #BEBEBE;
}

.spring-color {
  background: linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)
}

.summer1-color {
  background: black;
}

.summer2-color {
  background: black;
}

.modal-p {
  font-weight: 500;
}


#name {
  font-size: 20px;
  font-weight: 900;
}

.modal-label {
  font-weight: 900;
  /*color: #eee;*/
  font-size: 20px;
  font-weight: 900;
}

#modal-close-btn {
  font-size: 20px;
  color: #ddd;
  border: none;
  margin: 0px;
  height: 50px;
  width: 100%;
  background: #2c3e50;
}

.spacing {
  margin-bottom: 40px;
}

#name {
  text-align: center;
}

#info-container {
  max-height: 800px;
  overflow-y: scroll;
  padding: 30px;
}

</style>
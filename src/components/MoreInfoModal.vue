<template>
<!--            width="80%"
           height="auto" -->
  <div id="modal-outside-container">
    <modal name="more-info"
           :max-width="800"
           :adaptive="true"
           height="auto"
           width="80%"
           style="margin-bottom: 0px;"
    >
        <div id="info-container" :class="currentSeason()" ref="modalRef">
          <div :class="isNightMode()">
            <div id="modal-top" class="spacing">
              <div id="modal-center">
                <h5 id="name">{{ moreInfoData.name }} {{ moreInfoData.num }} {{ moreInfoData.sec }} </h5>
                <span id="credits">Credits - {{ moreInfoData.credits }}</span>
              </div>
              <div id="modal-right">
                <b-button id="close-btn" @click="close"><i class="material-icons">close</i></b-button>
              </div>
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
      } else if (app.contains('summer-one-img')){
        var background = 'summer1-color'
      } else if (app.contains('summer-two-img')){
        var background = 'summer2-color'
      } else {
        var background = 'night-mode-color'
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

#modal-center {
  margin: 0px auto;
  text-align: center;
}

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

#modal-top {
  display: flex;
}

.night-theme {
  color: #BEBEBE;
}

#close-btn {
  width: 40px;
  height: 40px;
  line-height: 0px;
}

#credits {
  font-size: 16px;
  font-weight: 500;
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
  background-image: linear-gradient(147deg, #000000 0%, #04619f 74%) !important;
}

.summer2-color {
  background-image: linear-gradient(316deg, #6c33a3 0%, #8241b8 74%) !important;
}

.night-mode-color {
  background: black !important;
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
  /*max-width: 600px;*/
  overflow-y: scroll;
  padding: 30px;
}

</style>
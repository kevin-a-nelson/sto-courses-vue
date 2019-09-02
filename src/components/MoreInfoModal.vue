<template>
  <div>
    <modal name="more-info"
           width="60%"
           height="auto"
           style="margin-bottom: 0px;"
    >
        <div id="info-container" :class="currentSeason()" ref="modalRef">
          <div class="spacing">
            <h5 id="name">
              {{ moreInfoData.name }}
            </h5>
          </div>
          <div class="spacing" ref="testSpace">
            <h5 class="modal-label">Prereqs</h5>
              {{ moreInfoData.prereqs }}
          </div>
          <div class="spacing">
            <h5 class="modal-label">Description</h5>
            {{ moreInfoData.description }}
          </div>

          <div class="spacing">
            <h5 class="modal-label">Notes</h5>
            {{ moreInfoData.notes }}
          </div>
        </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'more-info-modal',
  props: ['moreInfoData', 'modalName'],
  methods: {
    close() {
      this.$modal.hide('more-info')
    },
    currentSeason() {
      var background = ''
      var app = document.getElementById('app').classList
      if(app.contains('fall-img')) {
        var background = 'fall-color'
      } else if (app.contains('winter-img')) {
        var background = 'winter-color'
      } else {
        var background = 'summer1-color'
      }
      return background
    }
  }, 
}
</script>

<style>

.winter-color {
  background: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);
}

.fall-color {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)
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


#name {
  font-size: 20px;
  font-weight: 900;
}

.modal-label {
  color: #eee;
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
  max-height: 500px;
  overflow-y: scroll;
  color: #eee;
  padding: 30px;
}

</style>
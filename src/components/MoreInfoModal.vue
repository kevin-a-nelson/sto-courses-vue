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
        <!-- <button @click="close" id="modal-close-btn">Close</button> -->
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
      return document.getElementById('app').classList.contains('fall-background-image') ? 'fall-background-color' : 'winter-background-color'
    }
  }, 
}
</script>

<style>

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
  /*border: solid blue;*/
  /*border-width: 3px;*/
  height: 50px;
  width: 100%;
  background: #2c3e50;
}

.spacing {
  margin-bottom: 40px;
}

#name {
  text-align: center;
  /*font-size: 10px;*/
}

#info-container {
  max-height: 500px;
  overflow-y: scroll;
  color: #eee;
  padding: 30px;
}

</style>
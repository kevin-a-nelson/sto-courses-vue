<template>
  <div id="modal-container">
    <modal :name="modalName"
           width="80%"
           height="auto"
    >
      <div id="info-container">
        <div class="spacing">
          <h5 id="name">
            {{ moreInfoData.name }}
          </h5>
        </div>
        <div class="spacing">
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
      <b-button id="modal-close-btn">Close</b-button>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'more-info-modal',
  props: ['moreInfoData', 'modalName']
}
</script>

<style>



#name {
  font-size: 20px;
  font-weight: 900;
}

.modal-label {
  font-size: 20px;
  font-weight: 900;
}

#modal-close-btn {
  border-width: 3px;
  height: 50px;
  width: 100%;
}

.spacing {
  margin-bottom: 40px;
}

#name {
  text-align: center;
  /*font-size: 10px;*/
}

#info-container {
  padding: 30px;
  /*background: #167df0;*/
}

</style>
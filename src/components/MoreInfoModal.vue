<template>
  <div>
    <modal :name="modalName"
           :height="700"
    >
      <div id="info-container">
        <div class="spacing">
          <h5 id="name">
            {{ moreInfoData.name }}
          </h5>
        </div>
        <div class="spacing">
          <h5>Prereqs</h5>
            {{ moreInfoData.prereqs }}
        </div>
        <div class="spacing">
          <h5>Description</h5>
          {{ moreInfoData.description }}
        </div>

        <div class="spacing">
          <h5>Notes</h5>
          {{ moreInfoData.notes }}
        </div>
      </div>
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

.spacing {
  margin-bottom: 40px;
}

#name {
  text-align: center;
  /*font-size: 10px;*/
}

#info-container {
  padding: 30px;
}

</style>
<template>
  <div>
    <modal name="more-info"
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

        <div class="spacing">
          <h5>Prof</h5>
          <a target="_blank" :href="`${moreInfoData.prof_url}`">{{ moreInfoData.prof }} </a>
          <!-- // <router-link :to="{ path: `${ moreInfoData.prof_url }`}"> {{ moreInfoData.prof }} </router-link> -->
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'more-info-modal',
    props: ['moreInfoData']
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
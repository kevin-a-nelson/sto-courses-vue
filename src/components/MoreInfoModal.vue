<template>
  <div>
    <modal name="more-info"
           :height="700"
    >
      <div id="info-container">
        <h3 id="name">
          {{ moreInfoData.name }}
        </h3>
        <h3>Prereqs</h3>
          {{ moreInfoData.prereqs }}
        <h3>Description</h3>
          {{ moreInfoData.description }}
        <h3>Notes</h3>
          {{ moreInfoData.notes }}
        <h3>Prof</h3>
          <router-link :to="{ path: `${ moreInfoData.prof_url }`}"> {{ moreInfoData.prof }} </router-link>
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

#name {
  text-align: center;
}

#info-container {
  padding: 30px;
}

</style>
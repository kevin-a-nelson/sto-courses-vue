<template>
  <div>
    <modal name="more-info"
           :height="700"
    >
      <div style="padding: 30px;">
        <h3 style="text-align: center;">
          name
          <!-- {{ moreInfoData.name }} -->
        </h3>
        <h3>Prereqs</h3>
          prereqs
          <!-- {{ moreInfoData.prereqs }} -->
        <h3>Description</h3>
          description
          <!-- {{ moreInfoData.description }} -->
        <h3>Notes</h3>
          notes
          <!-- {{ moreInfoData.notes }} -->
        <h3>Prof</h3>
          prof
          <!-- <router-link :to="{ path: `${ moreInfoData.prof_url }`}"> {{ moreInfoData.prof }} </router-link> -->
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'more-info-modal'
  }
</script>
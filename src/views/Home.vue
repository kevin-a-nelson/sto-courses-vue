<template>
  <div class="home">
    <div id="selectors">
      <year-selector class="selector"/>
      <whos-courses-selector class="selector"/>
      <semester-selector class="selector"/>
      <type-selector class="selector"/>
      <draft-selector class="selector"
      />

      <div style="margin-left: 399px">
        <button style="max-height: 60px; border-radius: 10px;">Hidden Columns</button>
        <button style="max-height: 60px; border-radius: 10px;" >Reset Columns</button>
        <button style="max-height: 60px; border-radius: 10px;" >Reset Filters</button>
      </div>
    </div>
    <div class="background-image">
      <user-courses-table />
    </div>
    <stolaf-courses-table />  
  </div>
</template>

<script>
import StolafCoursesTable from '@/components/StolafCoursesTable.vue'
import UserCoursesTable from '@/components/UserCoursesTable'
import YearSelector from '@/components/YearSelector.vue'
import SemesterSelector from '@/components/SemesterSelector.vue'

export default {
  name: 'home',
  components: {
    StolafCoursesTable,
    YearSelector,
    UserCoursesTable,
    SemesterSelector
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
  .background-image {
    color: blue;
    background: blue;
    height: 200%;
  }
</style>

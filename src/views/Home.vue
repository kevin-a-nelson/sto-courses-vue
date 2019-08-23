<template>
  <div class="home">
    {{ selectedYear }}
    <year-selector v-on:newYearSelected="newYearSelected"/>
    <stolaf-courses-table />
  </div>
</template>

<script>
import StolafCoursesTable from '@/components/StolafCoursesTable.vue'
import YearSelector from '@/components/YearSelector.vue'

export default {
  name: 'home',
  components: {
    StolafCoursesTable,
    YearSelector
  },
  data() {
    return {
      selectedYear: 2019
    }
  },
  methods: {
    newYearSelected(newSelectedYear) {
      this.selectedYear = newSelectedYear
    }
  }
}
</script>

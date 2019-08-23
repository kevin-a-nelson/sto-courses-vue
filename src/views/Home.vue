<template>
  <div class="home">
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
    return {}
  },
  methods: {}
}
</script>

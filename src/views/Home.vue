<template>
  <div class="home">
    <courses-table />
  </div>
</template>

<script>
import CoursesTable from '@/components/CoursesTable.vue'

export default {
  name: 'home',
  components: {
    CoursesTable
  }
}
</script>

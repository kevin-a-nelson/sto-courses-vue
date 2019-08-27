<template>
  <div class="home">
    <div id="top-section">
      <div id="top-section-selectors">
        <year-selector />
        <semester-selector />
        <button>Columns</button>
      </div>
    </div>
    <div id="user-section">
      <div id="user-courses-table-options">
        <draft-selector />
      </div>
      <user-courses-table />
    </div>
    <div id="stolaf-section">
      <div id="stolaf-courses-table-options">
        <type-selector />
        <button>Reset Filters</button>
      </div>
      <stolaf-courses-table />
    </div>
  </div>
</template>

<script>
import StolafCoursesTable from '@/components/StolafCoursesTable.vue'
import UserCoursesTable from '@/components/UserCoursesTable'
import YearSelector from '@/components/YearSelector.vue'
import SemesterSelector from '@/components/SemesterSelector.vue'
import DraftSelector from '@/components/DraftSelector.vue'
import TypeSelector from '@/components/TypeSelector.vue'

export default {
  name: 'home',
  components: {
    StolafCoursesTable,
    YearSelector,
    UserCoursesTable,
    SemesterSelector,
    DraftSelector,
    TypeSelector
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>

#top-section-selectors {
  margin: 10px auto 0 auto;
  display: flex;
  width: 325px;
  justify-content: space-between;
}

#user-section {
  padding: 30px;
}

#stolaf-section {
  padding: 0 30px;
}

#user-courses-table-options {
  margin-bottom: 10px;
  display: flex;
  width: 400px;
  justify-content: space-between;
}

#stolaf-courses-table-options {
  margin-bottom: 10px;
  display: flex;
  width: 300px;
  justify-content: space-between;
}

</style>

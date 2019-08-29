<template>
  <div id="mobile">
<!--     <b-select v-model="selectedYear">
      <option style="background: blue;" class="my-options"
        v-for="year in years"
        :value="year.value"
        :key="year.text">
        {{ year.text }}  
      </option>
    </b-select>
    <b-select v-model="selectedSemester">
      <option style="background: blue;" class="my-options"
        v-for="semester in semesters"
        :value="semester.value"
        :key="semester.text">
        {{ semester.text }}  
      </option>
    </b-select>
    <h1 id="header">{{ selectedValues.year }} {{ selectedValues.semester }}</h1>
    <div id="mobile-buttons">
      <div>
        <b-button class="mobile-button"type="is-info">Filters</b-button>
      </div>
      <div>
        <b-button class="mobile-button"type="is-info">Hide Columns</b-button>
      </div>
      <div>
        <b-button class="mobile-button"type="is-info">Go to My Courses</b-button>
      </div>
    </div> -->
    <b-table :data="stolafTableRows" :columns="columns"></b-table>
    {{ stolafTableRows }}
  </div>
</template>

<script>
  export default {
    name: 'mobile-table',
    props: ['stolafTableRows', 'columns']
  }
</script>
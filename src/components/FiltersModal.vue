<template>
  <div>
    <modal name="filters" width="60%" height="auto">
      <div id="modal-container">
        <b-select v-model="selectedYear">
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
        <b-select v-model="selectedSemester">
          <option style="background: blue;" class="my-options"
            v-for="semester in semesters"
            :value="semester.value"
            :key="semester.text">
            {{ semester.text }}  
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
        <b-select v-model="selectedSemester">
          <option style="background: blue;" class="my-options"
            v-for="semester in semesters"
            :value="semester.value"
            :key="semester.text">
            {{ semester.text }}  
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
        <b-select v-model="selectedSemester">
          <option style="background: blue;" class="my-options"
            v-for="semester in semesters"
            :value="semester.value"
            :key="semester.text">
            {{ semester.text }}  
          </option>
        </b-select>

      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'filters-modal',
    data() {
      return {
        years: [
          {text: 2019, value: 2019 },
          {text: 2018, value: 2019 },
          {text: 2017, value: 2019 },
          {text: 2016, value: 2019 },
          {text: 2015, value: 2019 },
        ],
        semesters: [
          { text: 'Fall', value: 1 },
          { text: 'Interim', value: 2 },
          { text: 'Spring', value: 3 },
          { text: 'Summer Session 1', value: 4 },
          { text: 'Summer Session 2', value: 5 },
        ],
        selectedSemester: 1,
        selectedYear: 2019,
      }
    }
  }
</script>

<style>
  #modal-container {
    padding: 30px;
  }

  #modal-container * {
    width: 100%;
    margin-bottom: 5px;
  }
</style>
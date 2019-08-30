<template>
  <div>
    <form>
      <b-select v-model="selectedYear"  
                @input="newYearSelected">
        <option
          v-for="year in years"
          :value="year.value">
          {{ year.text }}
        </option>
      </b-select>
    </form>
  </div> 
</template>

<script>
  export default {
    name: 'year-selector',
    data() {
        return {
        selectedYear: 2019,
        years: [
          {text: 2019, value: 2019 },
          {text: 2018, value: 2018 },
          {text: 2017, value: 2017 },
          {text: 2016, value: 2016 },
          {text: 2015, value: 2015 },
        ],
      }
    },
    methods: {
      newYearSelected() {
        console.log(this.selectedYear)
        this.$emit('newYearSelected', 'year' ,this.selectedYear)
      },
    }
  }
</script>
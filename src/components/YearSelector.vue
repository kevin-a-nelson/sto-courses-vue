<template>
  <div>
    <form>
      <select v-model="selectedYear" v-on:change="newYearSelected">
        <option v-for="year in years">
          {{ year }}
        </option>
      </select>
    </form>
  </div> 
</template>

<script>
  export default {
    name: 'year-selector',
    props: ['querySelectedYear'],
    data() {
        return {
        selectedYear: this.querySelectedYear,
        years: [ 2015, 2016, 2017, 2018, 2019 ]
      }
    },
    methods: {
      newYearSelected() {
        this.$emit('newYearSelected', 'year' ,this.selectedYear)
      },
    }
  }
</script>
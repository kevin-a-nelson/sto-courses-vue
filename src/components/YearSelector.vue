<template>
  <div>
    <form>
      <select v-model="newSelectedYear" v-on:change="newYearSelected">
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
    data() {
        return {
        newSelectedYear: 2019,
        years: [ 2015, 2016, 2017, 2018, 2019 ]
      }
    },
    methods: {
      newYearSelected() {
        this.$emit('newYearSelected', this.newSelectedYear)
      },
    }
  }
</script>
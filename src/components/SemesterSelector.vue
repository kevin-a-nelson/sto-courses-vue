<template>
  <div>
    <form>
      <select v-model="selectedSemester" v-on:change="newSemesterSelected">
        <option v-for="semester in semesters" v-bind:value="semester.value">
          {{ semester.text }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: 'semester-selector',
  props: ['querySelectedSemester'],
  data() {
    return {
      selectedSemester: this.querySelectedSemester,
      semesters: [
        { text: 'Fall', value: 1 },
        { text: 'Interim', value: 2 },
        { text: 'Spring', value: 3 },
        { text: 'Summer Session 1', value: 4 },
        { text: 'Summer Session 2', value: 5 },
      ]
    }
  },
  methods: {
    newSemesterSelected() {
      this.$emit('newSemesterSelected', 'semester' , this.selectedSemester)
    }
  }
}
</script>
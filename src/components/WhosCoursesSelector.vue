<template>
  <form>
    <select v-model="courseMode" v-on:change="newModeSelected">
      <option v-for="mode in modes" v-bind:value="mode.value">
        {{ mode.text }}
      </option>
    </select>
  </form>
</template>

<script>
  export default {
    name: 'whos-courses-selector',
    data() {
      return {
        courseMode: 'stolaf',
        modes: [
          { text: 'Stolaf Courses', value: 'stolaf' },
          { text: 'My Courses', value: 'user' },
          { text: 'Stared Courses', value: 'stared' },
        ]
      }
    },
    methods: {
      newModeSelected() {
        this.$emit('newPersonSelected', 'mode', this.courseMode)
      }
    }
  }
</script>
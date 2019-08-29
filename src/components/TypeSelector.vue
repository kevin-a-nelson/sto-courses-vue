<template>
  <div>
    <form>
      <b-select v-model="selectedType" @input="newTypeSelected">
        <option v-for="type in types" :value="type.value">
          {{ type.text }}
        </option>
      </b-select>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'type-selector',
    data() {
      return {
        selectedType: 'class',
        types: [
          { text: 'Class', value: 'class' },
          { text: 'Lab', value: 'lab' },
          { text: 'Independent Study', value: 'IS' },
          { text: 'Independent Research', value: 'IR' },
          { text: 'Academic Internship', value: 'AI' },
        ]
      }
    },
    methods: {
      newTypeSelected() {
        this.$emit('newTypeSelected', 'type', this.selectedType)
      }
    }
  }
</script>
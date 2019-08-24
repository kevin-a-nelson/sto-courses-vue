<template>
  <div>
    <form>
      <select v-model="selectedType" v-on:change="newTypeSelected">
        <option v-for="type in types" v-bind:value="type.value"> 
          {{ type.text }} 
        </option>
      </select>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'type-selector',
    props: ['querySelectedType'],
    data() {
      return {
        selectedType: this.querySelectedType,
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
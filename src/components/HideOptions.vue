<template>
  <div>
    <!-- <label class="typo__label">Hide Columns</label> -->
    <multiselect v-model="hiddenColumns" 
                 placeholder="Search a Tag"
                 :options="options" 
                 :multiple="true" 
                 :taggable="true" 
                 @input="newHideOptions">
    </multiselect>
  </div>
</template>

<script>

  export default {
    props: ['defaultHiddenColumns'],
    name: 'hide-options',
    data() {
      return {
        hiddenColumns: this.defaultHiddenColumns,
        options: [
          'Status',
          'Name',
          'Dept',
          'Gereqs',
          'Days',
          'Times',
          'Prof',
          'Rating',
          'Difficulty',
          'Reviews',
          'Prereqs',
          'Actions',
        ]
      }
    },
    methods: {
      newHideOptions() {
        this.$emit('newHideOptions', this.hiddenColumns )
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
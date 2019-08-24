<template>
  <div>’
    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="text" track-by="value" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
  </div>
</template>

<script>
  export default {
    name: 'hide-options',
    data() {
      return {
        value: [
          { text: 'Javascript', value: 'js' }
        ],
        options: [
          { text: 'Vue.js', value: 'vu' },
          { text: 'Javascript', value: 'js' },
          { text: 'Open Source', value: 'os' }
        ]
      }
    },
    methods: {
      addTag (newTag) {
        const tag = {
          text: newTag,
          value: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<template>
  <div>
    <b-select v-model="selectedDraft" @input="newDraftSelected" id="draft-selector">
      <option v-for="draft in drafts" :value="draft.value">
        {{ draft.text }}
      </option>
    </b-select>
  </div>
</template>

<script>
  export default {
    props: ['selectedDraft'],
    name: 'draft-selector',
    data() {
      return {
        // selectedDraft: 1,
        drafts: [
          { text: 'Draft 1', value: 1 },
          { text: 'Draft 2', value: 2 },
          { text: 'Draft 3', value: 3 },
          { text: 'Draft 4', value: 4 },
          { text: 'Draft 5', value: 5 },
        ]
      }
    },
    methods: {
      newDraftSelected() {
        this.$emit('newDraftSelected', 'draft', this.selectedDraft)
      }
    }
  }
</script>

<style>

</style>
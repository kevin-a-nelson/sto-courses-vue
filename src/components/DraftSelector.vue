<template>
  <div>
    <form>
      <select v-model="selectedDraft" v-on:change="newDraftSelected">
        <option v-for="draft in drafts" v-bind:value="draft.value">
          {{ draft.text }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['defaultDraft'],
    name: 'draft-selector',
    data() {
      return {
        selectedDraft: this.defaultDraft,
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
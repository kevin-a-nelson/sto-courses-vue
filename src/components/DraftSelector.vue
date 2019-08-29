<template>
  <div>
    <b-field label="My Courses" id="draft-label">
      <b-select v-model="selectedDraft" @input="newDraftSelected">
        <option v-for="draft in drafts" :value="draft.value">
          {{ draft.text }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
  export default {
    props: ['defaultDraft'],
    name: 'draft-selector',
    data() {
      return {
        selectedDraft: 1,
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

#draft-label {
  font-size: 20px;
}

</style>
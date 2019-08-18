<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"    
    />
  </div>
</template>

<script>
  export default {
    name: 'courses-table',
    data() {
      return {
        columns: [
          {
            label: 'Name',
            field: 'name',
          }
        ],
        rows: [
          { id:1, name: 'John' }
        ]
      }
    }
  }
</script>


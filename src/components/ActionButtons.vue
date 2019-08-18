<template>
  <div v-on:click="test(props) "v-if="props.column.field == 'actions'">
    <button>View</button>
    <button>Add</button>
    <button>Remove</button>
  </div>
</template>

<script>
export default {
  name: 'action-buttons',
  method: {
    test(props) {
      console.log(props)
    }
  }
}
  
</script>
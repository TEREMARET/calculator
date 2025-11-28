<template>
  <div>
      <select v-model="selectedItem" v-on:change="$emit('selected', selectedItem )">
        <option v-for="item in items" v-bind:key="item.id" :value="item" >{{item.name}}</option>
      </select>
  </div>
</template>

<script>
  export default {
    name: 'ipMask',
    props: ['items'],
    data() {
      return{
        selectedItem: null
      }
    }
  }
</script>
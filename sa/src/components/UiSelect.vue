<script setup lang="ts">
import { maskid } from '../ipMasks';

</script>

<template>
  <div>
      <select>
        <option v-for="id in maskid" :key="id" :value="id">{{ id }}</option>
      </select>
  </div>
</template>

<style>
select {
  width: 100px;
  height: 50px;
}

</style>
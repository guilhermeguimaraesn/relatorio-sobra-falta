<template>
  <div id="app">
    <EditarRelatorio />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditarRelatorio from '../components/EditarRelatorio.vue';

export default defineComponent({
  name: 'App',
  components: {
    EditarRelatorio
  }
});
</script>
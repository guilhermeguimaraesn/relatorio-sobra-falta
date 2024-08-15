<template>
  <div id="app">
    <MostrarRelatorio />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MostrarRelatorio from '../components/MostrarRelatorio.vue';

export default defineComponent({
  name: 'App',
  components: {
    MostrarRelatorio
  }
});
</script>
<template>
  <div id="app">
    <DetalhesRelatorio />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DetalhesRelatorio from '../components/DetalhesRelatorio.vue';

export default defineComponent({
  name: 'App',
  components: {
    DetalhesRelatorio
  }
});
</script>
<template>
  <div id="app">
    <CriarRelatorio />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CriarRelatorio from '../components/CriarRelatorio.vue';

export default defineComponent({
  name: 'App',
  components: {
    CriarRelatorio
  }
});
</script>
<template>
    <div v-if="item">
      <div class=" flex items-center bg-sky-900">
        <router-link to="/">
          <button class="text-left w-full p-4">
            <i class="pi pi-angle-left text-white" style="font-size: 2rem;"></i></button>
        </router-link>
        <h1 class="text-white w-full text-center text-2xl">Detalhes da Descarga Nº: {{ indice }}</h1>
      </div>
      <ul class="text-start p-4 flex flex-col gap-4">
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">
          Cliente: 
          <span class="font-normal">
             {{ item.cliente }}
          </span
        ></li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">
          Posto: 
          <span class="font-normal">
            {{ item.posto }}
          </span>
        </li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">Data de Descarga: <span class="font-normal">{{
          item.dataDescarga }}</span></li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">Hora de Descarga: <span class="font-normal">{{
          item.horaDescarga }}</span></li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">Litros Pedido: <span class="font-normal">{{
          item.litrPedido }} L</span></li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">Litros Descarga: <span class="font-normal">{{
          item.litrDescarga }} L</span></li>
        <li class="font-bold text-lg p-4 bg-sky-100 rounded-lg">
          Evidências:
          <div v-if="item.evidencia.length > 0" class="flex flex-col gap-2 mt-2">
            <img v-for="(img, index) in item.evidencia" :key="index" :src="img" alt="Evidência de Descarga"
              class="max-w-40 border border-gray-600 rounded" />
          </div>
          <p v-else class="font-normal">
            Evidencias não adicionadas!
          </p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Item não encontrado.</p>
    </div>
  
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface DescargaDate {
    cliente: string;
    posto: string;
    dataDescarga: string;
    horaDescarga: string;
    litrPedido: number;
    litrDescarga: number;
    evidencia: string[];
  }
  
  export default defineComponent({
    name: 'PaginaDetalhes',
    props: {
      indice: String
    },
    setup(props) {
      const route = useRoute();
      const item = ref<DescargaDate | null>(null);
  
      onMounted(() => {
        const dadosSalvos = localStorage.getItem('relatorioDescarga');
        if (dadosSalvos) {
          const relatorio = JSON.parse(dadosSalvos) as DescargaDate[];
          const index = props.indice || (route.params.indice as string);
          item.value = relatorio[parseInt(index)] || null;
        }
      });
      
      return {
        item
      };
    }
  });
  </script>
  
  <style scoped>
  img {
    max-height: 150px;
    object-fit: cover;
  }
  </style>
  
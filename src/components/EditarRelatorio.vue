<template>
    <div class="edit">
      <div class="bg-sky-900 flex">
          <router-link to="/">
            <button class="text-left w-full p-4 bg-sky-900">
              <i class="pi pi-angle-left text-white" style="font-size: 2rem;"></i>
            </button>
          </router-link>
  
          <h1 class="text-3xl text-white w-full p-4 bg-sky-900">Editar Descarga</h1>
        </div>
      <div class="bg-white h-full w-full flex flex-col items-center">
        <form v-if="item" class="p-4 flex flex-col gap-4 md:w-1/2" @submit.prevent="atualizarDados">
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg">
            <i class="pi pi-briefcase rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model="item.cliente" type="text" placeholder="Informe qual cliente" id="cliente" name="cliente"
              class="p-4 text-lg border bg-white rounded-r-lg border-sky-900 w-full">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg">
            <i class="pi pi-truck rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model="item.posto" type="text" placeholder="Informe qual o posto" id="posto" name="posto"
              class="p-4 text-lg border rounded-r-lg bg-white border-sky-900 w-full">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg w-full">
            <i class="pi pi-calendar rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model="item.dataDescarga" type="date" placeholder="Data" id="data-descarga" name="data-descarga"
              class="pl-4 pr-0 pt-4 pb-4 text-lg border rounded-r-lg bg-white border-sky-900 w-full">
          </div>
  
          <div class="flex items-center gap-2  bg-sky-200 rounded-lg w-full">
            <i class="pi pi-clock rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model="item.horaDescarga" type="time" placeholder="Hora" id="hora-descarga" name="hora-descarga"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg w-full">
            <i class="pi pi-flag rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model.number="item.litrPedido" type="number" placeholder="Litr. Pedido" id="lit-pedido"
              name="lit-pedido" class="p-4 text-lg border rounded-r-lg bg-white border-sky-900 w-full">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg w-full">
            <i class="pi pi-flag-fill rounded-l-lg p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input v-model.number="item.litrDescarga" type="number" placeholder="Litr. desc." id="lit-descarga"
              name="lit-descarga" class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full">
          </div>
  
          <div class="flex items-center gap-2 rounded-lg w-full h-full  bg-sky-200">
            <div class="h-full p-4">
              <i class="pi pi-images rounded-l-lg text-sky-900 flex items-center" style="font-size: 2rem"></i>
            </div>
  
            <div class="flex flex-wrap gap-2 bg-white border w-full border-sky-900 rounded-r-lg">
              <div class="flex justify-between w-full bg-sky-100" v-for="(img, index) in item.evidencia" :key="index">
                <img :key="index" :src="img" alt="Pré-visualização da imagem"
                  class="max-w-20 border border-gray-600 rounded">
                <button class="p-4 font-bold" type="button" @click="apagarImagem(index)">
                  <i class="pi pi-trash text-sky-900" style="font-size: 1.5rem;"></i>
                </button>
              </div>
              <input type="file" @change="adicionouImagem" multiple placeholder="Adicione as evidências" id="evidencia"
                name="evidencia" class="p-4 text-lg border bg-transparent border-none w-full h-full bg-orange-100">
            </div>
          </div>
          <router-link to="/">
            <button id="registrar"
              class="flex p-4 items-center justify-center gap-2 w-full bg-sky-900 text-white rounded-xl font-bold text-xl"
              @click="botaoRegistrar">
              <i class="pi pi-save" style="font-size: 1.5rem;"></i>
              Registrar Descarga
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
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
    name: 'PaginaEditar',
    props: {
      indice: String
    },
    setup(props) {
      const route = useRoute();
      const router = useRouter();
      const item = ref<DescargaDate | null>(null);
  
      function apagarImagem(index: number): void {
        if (item.value?.evidencia) {
          item.value.evidencia.splice(index, 1);
          atualizarDados()
        }
      }
  
      function botaoRegistrar(): void {
        atualizarDados()
        alert("Dados atualizados com sucesso!")
        router.push('/');
      }
  
      function atualizarDados(): void {
        if (item.value) {
          const dadosSalvos = localStorage.getItem('relatorioDescarga');
  
          if (dadosSalvos) {
            const relatorio = JSON.parse(dadosSalvos) as DescargaDate[];
            const index = parseInt(props.indice || (route.params.indice as string));
            relatorio[index] = { ...item.value };
            localStorage.setItem('relatorioDescarga', JSON.stringify(relatorio));
          }
        }
      }
  
      function adicionouImagem(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (!files) return;
  
        const fileArray = Array.from(files);
        if (fileArray.length + (item.value?.evidencia.length || 0) > 3) {
          alert('Você pode adicionar no máximo 3 imagens.');
          return;
        }
  
        fileArray.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result && item.value) {
              item.value.evidencia.push(reader.result as string);
            }
          };
  
          reader.readAsDataURL(file);
        });
      }
  
      onMounted(() => {
        const dadosSalvos = localStorage.getItem('relatorioDescarga');
        if (dadosSalvos) {
          const relatorio = JSON.parse(dadosSalvos) as DescargaDate[];
          const index = parseInt(props.indice || (route.params.indice as string));
          item.value = relatorio[index] || null;
        }
      });
  
      return {
        item,
        atualizarDados,
        adicionouImagem,
        apagarImagem,
        botaoRegistrar
      };
    }
  });
  </script>
<template>
    <div class="about">
      <div class="flex bg-sky-900">
        <router-link to="/"><button class="text-left w-full pt-4 pl-4">
            <i class="pi pi-angle-left text-white" style="font-size: 2rem;"></i></button>
        </router-link>
        <h1 class="text-3xl text-center w-full text-white p-4">Registrar Descarga</h1>
      </div>
      <div class="bg-white h-screen w-full flex flex-col items-center">
        <form class="p-4 flex flex-col gap-4 md:w-1/2" @submit.prevent="obterDados">
  
          <div class="flex  items-center rounded-lg bg-sky-200 gap-2">
            <i class="pi pi-briefcase p-4 text-sky-900  flex items-center" style="font-size: 2rem"></i>
            <input type="text" placeholder="Informe qual cliente" id="cliente" name="cliente"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg">
            <i class="pi pi-truck p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input type="text" placeholder="Informe qual o posto" id="posto" name="posto"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2 w-full bg-sky-200 rounded-lg">
            <i class="pi pi-calendar p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input type="date" placeholder="Data e hora" id="data-descarga" name="data-descarga"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2 w-full bg-sky-200 rounded-lg">
            <i class="pi pi-clock p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input type="time" placeholder="Data e hora" id="hora-descarga" name="hora-descarga"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2  bg-sky-200 rounded-lg">
            <i class="pi pi-flag p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input type="number" placeholder="Litr. Pedido" id="lit-pedido" name="lit-pedido"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2 bg-sky-200 rounded-lg">
            <i class="pi pi-flag-fill p-4 text-sky-900 flex items-center" style="font-size: 2rem"></i>
            <input type="number" placeholder="Litr. descarga" id="lit-descarga" name="lit-descarga"
              class="p-4 text-lg border bg-white border-sky-900 rounded-r-lg w-full custon-placehoder">
          </div>
  
          <div class="flex items-center gap-2 rounded-lg w-full h-full  bg-sky-200">
            <i class="pi pi-images p-4 text-sky-900" style="font-size: 2rem"></i>
            <div class="flex flex-wrap w-full gap-2 bg-white border border-sky-900 rounded-r-lg">
              <div class="flex justify-between w-full bg-sky-100" v-for="(img, index) in previewSrc" :key="index">
                <img :key="index" :src="img" alt="Pré-visualização da imagem"
                  class="max-w-20 border border-gray-600 rounded">
                <button class="p-4 font-bold" type="button" @click="apagarImagem(index)">
                  <i class="pi pi-trash text-sky-900" style="font-size: 1.5rem;"></i>
                </button>
              </div>
              <input type="file" @change="adicionouImagem" multiple placeholder="Adicione as evidências" id="evidencia"
                name="evidencia" class="p-4 rounded border border-gray-600 w-full h-full bg-white">
            </div>
  
          </div>
  
          <button id="registrar"
            class="flex p-4 items-center justify-center gap-2 w-full bg-sky-900 text-white rounded-xl font-bold text-xl">
            <i class="pi pi-save" style="font-size: 1.5rem;"></i>
            Registrar Descarga
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  
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
    name: 'relDescarga',
    setup() {
  
      const relatorioDescarga = ref<DescargaDate[]>([]);
      const previewSrc = ref<string[]>([]);
      const totalImages = ref(0);
  
      function obterDados(): void {
        const clienteInput = (document.getElementById('cliente') as HTMLInputElement).value;
        const postoInput = (document.getElementById('posto') as HTMLInputElement).value;
        const dataDescargaInput = (document.getElementById('data-descarga') as HTMLInputElement).value;
        const horaDescargaInput = (document.getElementById('hora-descarga') as HTMLInputElement).value;
        const litrPedidoInput = parseInt((document.getElementById('lit-pedido') as HTMLInputElement).value);
        const litrDescargaInput = parseInt((document.getElementById('lit-descarga') as HTMLInputElement).value);
  
        adicionarDados(clienteInput, postoInput, dataDescargaInput, horaDescargaInput, litrPedidoInput, litrDescargaInput)
      }
  
      function formatarData(data: string): string {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
      }
  
      function adicionarDados(cliente: string, posto: string, dataDescarga: string, horaDescarga: string, litrPedido: number, litrDescarga: number) {
  
        if (cliente && posto) {
          const dataFormatada = formatarData(dataDescarga);
  
          relatorioDescarga.value.push({
            cliente: cliente,
            posto: posto,
            dataDescarga: dataFormatada,
            horaDescarga: horaDescarga,
            litrPedido: litrPedido,
            litrDescarga: litrDescarga,
            evidencia: previewSrc.value,
          });
  
          salvarRelatorioDescarga();
          alert('Dados registrados com sucesso!');
          window.location.reload();
          return
        }
        alert('Por favor, preencha todos os campos.');
      }
  
      function apagarImagem(index: number): void {
        if (previewSrc.value) {
          previewSrc.value.splice(index, 1);
          totalImages.value--
          console.log(totalImages.value)
        }
      }
  
      function carregarRelatorioDescarga(): void {
        const dadosSalvos = localStorage.getItem('relatorioDescarga');
        if (dadosSalvos) {
          relatorioDescarga.value = JSON.parse(dadosSalvos);
        }
      }
  
      function salvarRelatorioDescarga(): void {
        localStorage.setItem('relatorioDescarga', JSON.stringify(relatorioDescarga.value));
      }
  
      function adicionouImagem(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (!files) return;
  
        const fileArray = Array.from(files);
        const limiteImagem = 3 - totalImages.value;
  
        if (fileArray.length > limiteImagem) {
          alert('Você pode adicionar no máximo 3 imagens.');
          return;
        }
  
        fileArray.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              previewSrc.value.push(reader.result as string);
              totalImages.value++;
            }
          };
  
          reader.readAsDataURL(file);
        });
      }
  
      onMounted(() => {
        carregarRelatorioDescarga();
      });
  
      return {
        relatorioDescarga,
        previewSrc,
        adicionouImagem,
        obterDados,
        totalImages,
        apagarImagem
      };
    }
  });
  </script>
  
  <style scoped>
  .custon-placehoder::placeholder {
    color: dimgrey
  }
  
  img {
    border: 1px solid #ccc;
    margin-top: 10px;
  }
  </style>
  
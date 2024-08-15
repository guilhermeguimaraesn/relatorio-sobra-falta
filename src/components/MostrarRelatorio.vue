<template>
    <div class="w-full bg-sky-900">
        <h1 class="text-3xl text-white p-4">Relatórios de Descarga</h1>
    </div>
    <div class="flex flex-col gap-4 p-4 justify-center items-center">

        <div class="home bg-sky-200  rounded border border-sky-900 md:w-1/2 justify-center flex flex-col " v-for="(entry, index) in relatorioDescarga"
            :key="index">
            <div class="p-4 flex flex-col gap-4" @click="paginaDetalhes(index)">

                <div class="flex flex-col gap-4 justify-center">
                    <p class="font-bold">Cliente: {{ entry.cliente }}</p>
                    <p class="">Posto: {{ entry.posto }}</p>
                </div>

                <div class="flex gap-4 justify-center">
                    <p class="font-bold">Data: <span class="font-normal"> {{ entry.dataDescarga }} </span></p>
                    <p class="font-bold">Hora: <span class="font-normal">{{ entry.horaDescarga }}</span></p>
                </div>

                <div class="flex justify-center gap-4">
                    <div>
                        <p>Pedido Litr.</p>
                        <p>{{ entry.litrPedido }} L</p>
                    </div>

                    <div>
                        <p>Descarga Litr.</p>
                        <p>{{ entry.litrDescarga }} L</p>
                    </div>

                    <div>
                        <p>Saldo</p>
                        <p v-if="(entry.litrDescarga - entry.litrPedido) < 0" class="font-bold text-red-700 text-xl">
                            {{ entry.litrDescarga - entry.litrPedido }} L
                        </p>
                        <p v-if="(entry.litrDescarga - entry.litrPedido) == 0" class="font-bold text-black text-xl">
                            {{ entry.litrDescarga - entry.litrPedido }} L
                        </p>
                        <p v-if="(entry.litrDescarga - entry.litrPedido) > 0" class="font-bold text-green-800 text-xl">
                            + {{ entry.litrDescarga - entry.litrPedido }} L
                        </p>
                    </div>

                </div>
                <div class="flex gap-4 justify-center items-center">
                    <p>Comprovante:</p>
                    <p v-if="!valorVazio(entry.evidencia[index])">
                        <i class="pi pi-check-circle text-green-700" style="font-size: 2rem"></i>
                    </p>
                    <p v-else>
                        <i class="pi pi-exclamation-circle text-yellow-600" style="font-size: 2rem"></i>
                    </p>
                </div>

            </div>
            <div class="w-full flex">
                <button @click="paginaEditar(index)"
                    class="w-1/2 flex justify-center gap-2 bg-yellow-500 text-white p-4 items-center">
                    <i class="pi pi-file-edit text-white" style="font-size: 1.5rem;"> </i> Editar
                </button>
                <button @click="deletarItem(index)"
                    class="w-1/2 flex justify-center gap-2 items-center bg-red-500 text-white">
                    <i class="pi pi-trash " style="font-size: 1.5rem;"></i> Excluir
                </button>
            </div>

        </div>
        <router-link to="/novo-relatorio">
            <button
                class="text-3xl fixed bottom-0 right-0 p-4 m-4 bg-sky-900 text-white rounded-full w-16 h-16">+</button>
        </router-link>

    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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
    name: 'exibirRelatórios',
    setup() {
        const relatorioDescarga = ref<DescargaDate[]>([]);
        const router = useRouter();

        function valorVazio(value: string | null | undefined): boolean {
            return value == null || value.trim() === '';
        }

        function carregarRelatorioDescarga(): void {
            const dadosSalvos = localStorage.getItem('relatorioDescarga');
            if (dadosSalvos) {
                relatorioDescarga.value = JSON.parse(dadosSalvos);
                return
            }
        }

        function paginaDetalhes(indice: number) {
            router.push({ name: 'DetalhesRel', params: { indice } });
        }

        function deletarItem(indice: number) {
            const resposta = confirm("Tem certeza que deseja Deletar este Relatório?");

            if(resposta){
                relatorioDescarga.value.splice(indice, 1)
                localStorage.setItem('relatorioDescarga', JSON.stringify(relatorioDescarga.value));
                alert("Relatório excluido com sucesso!");
                return;
            }
            
            alert("Exclusão cancelada"); 
        }

        function paginaEditar(indice: number) {
            router.push({ name: 'EditarRel', params: { indice } });
        }

        onMounted(() => {
            carregarRelatorioDescarga();
        });

        return {
            paginaDetalhes,
            relatorioDescarga,
            valorVazio,
            paginaEditar,
            deletarItem
        };
    }
});
</script>
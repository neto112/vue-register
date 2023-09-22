<template>
  <div>
    <FormOrder
      formTitle="Adicionar Pedido"
      submitButtonText="Salvar"
      :initialFormData="formData"
      @submit="addOrder"
    />
  </div>
</template>

<script setup lang="ts">
import { IOrder } from "@/interface/orders";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormOrder from "@/components/FormOrder.vue";
import { showSuccessAlert } from "@/utils/alerts";

const store = useStore();
const router = useRouter();

const formData: IOrder = {
  id: 0,
  cliente: { id: 1, nome: "" },
  dataEmissao: "",
  valorTotal: 0,
  itens: [
    {
      id: 1,
      produto: { id: 1, descricao: "" },
      valor: 0,
      quantidade: 0,
      subtotal: 0,
    },
  ],
};

const addOrder = async () => {
  await store.dispatch("orders/createOrder", formData);
  showSuccessAlert("O pedido foi adicionado com sucesso.");
  router.push("/lista-pedido");
};
</script>
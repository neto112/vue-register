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
  formData.itens.forEach((item) => {
    if (item.valor !== null && item.quantidade !== null) {
      item.subtotal = item.valor * item.quantidade;
    }
  });

  // Calcular o valor total com base nos subtotais
  formData.valorTotal = formData.itens.reduce((total, item) => {
    if (item.subtotal !== null) {
      return total + item.subtotal;
    } else {
      return total;
    }
  }, 0);

  await store.dispatch("pedidos/createOrder", formData);
  router.push("/lista-pedido");
};
</script>
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
  cliente: { id: 0, nome: "" },
  dataEmissao: "",
  valorTotal: 0,
  itens: [],
};

const addOrder = async () => {
  await store.dispatch("pedidos/createOrder", formData);
  router.push("/lista-pedido");
};
</script>
<template>
  <div>
    <template v-if="formData.dataEmissao">
      <FormOrder
        formTitle="Editar Pedido"
        submitButtonText="Atualizar"
        :initialFormData="formData"
        @submit="updateOrder"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IOrder } from "@/interface/orders";
import FormOrder from "@/components/FormOrder.vue";
import { showSuccessAlert } from "@/utils/alerts";

const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = ref<IOrder>({
  cliente: { nome: "" },
  dataEmissao: "",
  valorTotal: 0,
  itens: [
    {
      produto: { descricao: "" },
      valor: 0,
      quantidade: 0,
      subtotal: 0,
    },
  ],
});

const updateOrder = async () => {
  await store.dispatch("orders/updateOrder", formData.value);
  showSuccessAlert("O pedido foi atualizado com sucesso.");
  router.push("/lista-pedido");
};

const fetchOrderData = async (orderId: number) => {
  const order = store.getters["orders/getOrderById"](orderId);
  formData.value = { ...order };
};

onMounted(async () => {
  const orderId = Number(route.params.id);
  await fetchOrderData(orderId);
});
</script>
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
import Swal from "sweetalert2";

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
  await store.dispatch("pedidos/updateOrder", formData.value);
  await Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "O pedido foi atualizado com sucesso.",
  });
  router.push("/lista-pedido");
};

const fetchOrderData = async (orderId: number) => {
  const order = store.getters["pedidos/getOrderById"](orderId);
  formData.value = { ...order };
};

onMounted(async () => {
  const personId = Number(route.params.id);
  await fetchOrderData(personId);
});
</script>
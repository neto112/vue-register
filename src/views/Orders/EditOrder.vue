<template>
  <div>
    <template v-if="formData.nome">
      <FormOrder
        formTitle="Editar Pessoa"
        submitButtonText="Atualizar"
        :initialFormData="formData"
        @submit="updatePerson"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IOrder } from "@/interface/order";
import FormOrder from "@/components/FormOrder.vue";
import Swal from "sweetalert2";

const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = ref<IOrder>({ 
  cliente: "",
  dataEmissao: "",
  valorTotal: 0,
  itens: [], 
});

const updatePerson = async () => {
  await store.dispatch("people/editPerson", formData.value);
  router.push("/");
};

const fetchPersonData = async (orderId: number) => {
  const person = store.getters["people/getPersonById"](orderId);
  await Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "O pedido foi atualizado com sucesso.",
  });
  formData.value = { ...person };
};

onMounted(async () => {
  const personId = Number(route.params.id);
  await fetchPersonData(personId);
});
</script>
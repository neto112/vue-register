<template>
  <div>
    <FormProduct
      formTitle="Adicionar Produto"
      submitButtonText="Salvar"
      :initialFormData="formData"
      @submit="addProduto"
    />
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "@/interface/product";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormProduct from "@/components/FormProduct.vue";
import { showSuccessAlert } from "@/utils/alerts";

const store = useStore();
const router = useRouter();

const formData: IProduct = {
  id: 0,
  descricao: "",
  valoUnitario: 0,
};

const addProduto = async () => {
  await store.dispatch("products/addProduct", formData);
  showSuccessAlert("O produto foi adicionado com sucesso.");
  router.push("/lista-produto");
};
</script>
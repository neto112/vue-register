<template>
  <div>
    <template v-if="formData.descricao">
      <FormProduct
        formTitle="Editar Produto"
        submitButtonText="Atualizar"
        :initialFormData="formData"
        @submit="updateProduct"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IProduct } from "@/interface/product";
import FormProduct from "@/components/FormProduct.vue";
import Swal from "sweetalert2";

const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = ref<IProduct>({ descricao: "", valoUnitario: 0 });

const updateProduct = async () => {
  await store.dispatch("products/editProduct", formData.value);
  await Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Esse produto foi atualizado com sucesso.",
  });
  router.push("/lista-produto");
};

const fetchProductData = async (productId: number) => {
  const product = store.getters["products/getProductById"](productId);
  formData.value = { ...product };
};

onMounted(async () => {
  const productId = Number(route.params.id);
  await fetchProductData(productId);
});
</script>
<template>
  <div class="div-container">
    <h1 class="page-title">Lista de Produtos</h1>
    <div class="filter-inputs">
      <input
        type="text"
        v-model="filterProductDescription"
        placeholder="Filtrar por descrição do produto"
        class="filter-product-description"
      />
      <input
        type="number"
        v-model="filterProductPrice"
        placeholder="Filtrar por valor unitário"
        class="filter-product-price"
      />

      <div style="flex-grow: 1"></div>

      <button class="add-button" @click="addProduct">Adicionar produto</button>
    </div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Descrição do Produto</th>
          <th>Valor Unitário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in listOfProducts" :key="product.id">
          <td>{{ product.descricao }}</td>
          <td>R$ {{ formatPriceValue(product.valoUnitario) }}</td>
          <td class="icon-pointer">
            <Pencil class="pencil-color" @click="editProduct(product.id)" />
            <Delete class="delete-color" @click="deleteProduct(product.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "@/interface/product";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Pencil from "vue-material-design-icons/Pencil.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import useComposable from "@/useComp";

const store = useStore();
const listOfProducts = ref([]);
const router = useRouter();
const filterProductDescription = ref("");
const filterProductPrice = ref<string>("");
const { formatPriceValue } = useComposable();

const filterProducts = () => {
  listOfProducts.value = store.state.products.products.filter(
    (product: IProduct) => {
      const matchesDescription = product.descricao
        .toLowerCase()
        .includes(filterProductDescription.value.toLowerCase());

      const matchesPrice =
        filterProductPrice.value === "" ||
        product.valoUnitario.toString().includes(filterProductPrice.value);

      return matchesDescription && matchesPrice;
    }
  );
};

watch([filterProductDescription, filterProductPrice], () => {
  filterProducts();
});

const addProduct = () => {
  router.push("/adicionar-produto");
};

const editProduct = (productId: number) => {
  router.push({ name: "editar-produto", params: { id: productId } });
};

const deleteProduct = async (productId: number) => {
  const result = await Swal.fire({
    title: "Tem certeza que deseja excluir o produto?",
    text: "Esta ação não pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ff0000",
  });

  if (result.isConfirmed) {
    await store.dispatch("products/deleteProduct", productId);
    await fetchProducts();
    Swal.fire("Excluído!", "O produto foi excluído com sucesso.", "success");
  }
};

async function fetchProducts() {
  await store.dispatch("products/loadProducts");
  listOfProducts.value = await store.state.products.products;
}

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.div-container {
  width: 70%;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.filter-inputs {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.filter-product-description,
.filter-product-price {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 8px;
}

.filter-product-description:hover,
.filter-product-price:hover {
  border: 1px solid #aaaeb7;
}

.filter-product-description,
.filter-product-price {
  width: 30%;
}

.add-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #0056b3;
}

.custom-table {
  border-collapse: collapse;
  margin-bottom: 20px;
  width: 100%;
}

thead {
  background-color: #007bff;
  color: white;
}

th {
  padding: 10px;
  text-align: left;
  text-align: center;
}

td {
  padding: 10px;
  border: 1px solid #ddd;
}

.icon-pointer span {
  cursor: pointer;
}

.pencil-color:hover {
  color: aqua;
}

.delete-color:hover {
  color: red;
}

@media (max-width: 768px) {
  .custom-table {
    width: 100%;
    overflow-x: auto;
    font-size: 14px;
  }

  .custom-table th,
  .custom-table td {
    padding: 4px;
  }

  .div-container {
    width: 95%;
  }

  .filter-inputs {
    flex-direction: column;
  }

  .filter-product-description,
  .filter-product-price {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .add-button {
    width: 100%;
  }
}
</style>
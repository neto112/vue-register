<template>
  <div class="div-container">
    <h1 class="page-title">Lista de Pedidos</h1>
    <div class="filter-inputs">
      <input
        type="text"
        v-model="filterValorTotal"
        placeholder="Filtrar por valor Total"
        class="filter-text"
      />
      <VueDatePicker
        v-model="filterDataEmissao"
        placeholder="Filtrar por Data de Emissão"
        :enable-time-picker="false"
        format="dd/MM/yyyy"
        :locale="locale"
        class="filter-picker"
      />

      <div style="flex-grow: 1"></div>

      <button class="add-button" @click="addOrder">Adicionar pedido</button>
    </div>
    <h1>Lista de Pedidos</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID do Pedido</th>
          <th>Cliente</th>
          <th>Data de Emissão</th>
          <th>Valor Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in listOfOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.cliente.nome }}</td>
          <td>{{ formatDayMonthYear(order.dataEmissao) }}</td>
          <td>{{ formatPriceValue(order.valorTotal) }}</td>
          <td class="icon-pointer">
            <Eye
              class="eye-color"
              title="Mostrar tabela do Cliente e do Itens"
              @click="showDetails(order.id)"
            />
            <Pencil class="pencil-color" @click="editOrder(order.id)" />
            <Delete class="delete-color" @click="deleteOrder(order)" />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showDetailsModal">
      <h1>Lista de Clientes</h1>
      <table class="custom-table">
        <thead>
          <tr>
            <th>ID do Cliente</th>
            <th>Nome do Cliente</th>
            <!-- <th>Ações</th> -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ selectedOrder.cliente.id }}</td>
            <td>{{ selectedOrder.cliente.nome }}</td>
            <!-- <td class="icon-pointer">
              <Pencil class="pencil-color" @click="editCustomer(customer.id)" />
              <Delete
                class="delete-color"
                @click="deleteCustomer(customer.id)"
              />
            </td> -->
          </tr>
        </tbody>
      </table>

      <h1>Itens do Pedido</h1>
      <table class="custom-table">
        <thead>
          <tr>
            <th>ID do Item</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <!-- <th>Ações</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in selectedOrder.itens" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.produto.descricao }}</td>
            <td>{{ order.valor }}</td>
            <td>{{ order.quantidade }}</td>
            <td>{{ order.subtotal }}</td>
            <!-- <td class="icon-pointer">
              <Pencil class="pencil-color" @click="editItem(item.id)" />
              <Delete class="delete-color" @click="deleteItem(item.id)" />
            </td> -->
          </tr>
        </tbody>
      </table>
      <button @click="closeDetails">Fechar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from "vue";
import { useStore } from "vuex";
import Pencil from "vue-material-design-icons/Pencil.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import { useRouter } from "vue-router";
import useComposable from "@/utils/useComp";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Eye from "vue-material-design-icons/Eye.vue";
import { parse, isSameDay } from "date-fns";
import { confirmDelete, showSuccessMessage } from "@/utils/alerts";
import { IOrder } from "@/interface/orders";

const { formatDayMonthYear, formatPriceValue } = useComposable();

const store = useStore();
const listOfOrders: Ref<IOrder[]> = ref([]);

const router = useRouter();
const filterDataEmissao = ref<number | null>(null);
const filterValorTotal = ref("");
const locale = { lang: "br" };
const showDetailsModal = ref(false);
const selectedOrder: Ref<IOrder | null> = ref(null);

const fetchOrders = async () => {
  await store.dispatch("orders/fetchPedidos");
  listOfOrders.value = store.state.orders.pedidos;
};

const showDetails = (orderId: number) => {
  const foundOrder = listOfOrders.value.find((order) => order.id === orderId);
  if (foundOrder) {
    selectedOrder.value = foundOrder;
    showDetailsModal.value = true;
  }
};

const closeDetails = () => {
  showDetailsModal.value = false;
};

const filterOrders = () => {
  listOfOrders.value = store.state.orders.pedidos.filter((order: IOrder) => {
    const matchesDataEmissao =
      !filterDataEmissao.value ||
      isSameDay(
        parse(order.dataEmissao, "yyyy-MM-dd", new Date()),
        filterDataEmissao.value
      );

    const matchesValorTotal =
      filterValorTotal.value === "" ||
      order.valorTotal.toString().includes(filterValorTotal.value);

    return matchesDataEmissao && matchesValorTotal;
  });
};

watch([filterDataEmissao, filterValorTotal], () => {
  filterOrders();
});

const addOrder = () => {
  router.push("/adicionar-pedido");
};

const editOrder = (orderId: number) => {
  router.push({ name: "editar-pedido", params: { id: orderId } });
};

const deleteOrder = async (order: IOrder) => {
  if (await confirmDelete(`${order.cliente.nome}`)) {
    await store.dispatch("orders/deleteOrder", order.id);
    await fetchOrders();
    showSuccessMessage(
      `O pedido ${order.cliente.nome} foi excluído com sucesso.`
    );
  }
};

onMounted(async () => {
  await fetchOrders();
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

.filter-text {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 8px;
}

.filter-text:hover {
  border: 1px solid #aaaeb7;
}

.filter-text,
.filter-picker {
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

.eye-color:hover {
  color: green;
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

  input[type="text"] {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .filter-picker {
    width: 100%;
  }

  .add-button {
    width: 100%;
  }
}
</style>
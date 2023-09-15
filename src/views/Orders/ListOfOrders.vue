<template>
  <div class="div-container">
    <h1 class="page-title">Lista de Pedidos</h1>
    <div class="filter-inputs">
      <input
        type="text"
        v-model="filterNameCpf"
        placeholder="Filtrar por nome/CPF"
        class="filter-name-cpf"
      />
      <VueDatePicker
        v-model="filterDataNascimento"
        placeholder="Filtrar por Data de Nascimento"
        :enable-time-picker="false"
        format="dd/MM/yyyy"
        :locale="locale"
        class="vue-date-picker"
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
        {{
          listOfOrders
        }}
        <tr v-for="order in listOfOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.cliente.nome }}</td>
          <td>{{ formatDayMonthYear(order.dataEmissao) }}</td>
          <td>R$ {{ formatPriceValue(order.valorTotal) }}</td>
          <td class="icon-pointer">
            <Pencil class="pencil-color" @click="editOrder(order.id)" />
            <Delete class="delete-color" @click="deleteOrder(order.id)" />
          </td>
        </tr>
      </tbody>
    </table>

    <h1>Lista de Clientes</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID do Cliente</th>
          <th>Nome do Cliente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in listOfCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.nome }}</td>
        </tr>
      </tbody>
    </table>

    <h1>Itens do Pedido</h1>
    <table>
      <thead>
        <tr>
          <th>ID do Item</th>
          <th>Produto</th>
          <th>Valor</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in itensOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.produto.descricao }}</td>
          <td>{{ order.valor }}</td>
          <td>{{ order.quantidade }}</td>
          <td>{{ order.subtotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
// import { IOrder, IOrderItem, ICustomer } from "@/interface/order";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Pencil from "vue-material-design-icons/Pencil.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import { useRouter } from "vue-router";
import useComposable from "@/useComp";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";

const { formatDayMonthYear, formatPriceValue } = useComposable();

const store = useStore();
const listOfOrders = ref([]);
const listOfCustomers = ref([]);
const itensOrders = ref([]);

const router = useRouter();
const filterNameCpf = ref("");
const filterDataNascimento = ref<Date | null>(null);
const locale = { lang: "br" };

const fetchOrders = async () => {
  await store.dispatch("orders/fetchOrders");
  listOfOrders.value = store.state.orders.orders;
};

// async function fetchCustomers() {
//   await store.dispatch("customers/loadCustomers");
//   listOfCustomers.value = await store.state.customers.clientes;
// }

// async function fetchOrderItems(orderId: number) {
//   const order = listOfOrders.value.find((order) => order.id === orderId);
//   if (order) {
//     itensOrders.value = order.itens;
//   }
// }

// const addOrder = () => {
//   router.push("/adicionar-pedido");
// };

// const editOrder = (orderId: number) => {
//   router.push({ name: "editar-pedido", params: { id: orderId } });
// };

// const deleteOrder = async (orderId: number) => {
//   const result = await Swal.fire({
//     title: "Tem certeza que deseja excluir o Pedido?",
//     text: "Esta ação não pode ser desfeita!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Sim, excluir!",
//     cancelButtonText: "Cancelar",
//     confirmButtonColor: "#ff0000",
//   });

//   if (result.isConfirmed) {
//     await store.dispatch("orders/deleteOrder", orderId);
//     await fetchOrders();
//     Swal.fire("Excluído!", "O Pedido foi excluído com sucesso.", "success");
//   }
// };

onMounted(() => {
  fetchOrders();

  // fetchCustomers();
  // fetchOrderItems();
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

.filter-name-cpf {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 8px;
}

.filter-name-cpf:hover {
  border: 1px solid #aaaeb7;
}

.filter-name-cpf,
.vue-date-picker {
  width: 30%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
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

  input[type="text"] {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .vue-date-picker {
    width: 100%;
  }

  .add-button {
    width: 100%;
  }
}
</style>
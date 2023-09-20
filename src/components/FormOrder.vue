<template>
  <div class="container">
    <div class="header">
      <ArrowLeft @click="goBack" class="arrow-icon" />
      <h2 class="form-title">{{ formTitle }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group" v-for="(cliente, index) in clientes" :key="index">
        <label for="clientes">Nome do Cliente:</label>
        <div class="input-container">
          <span class="input-grid">
            <input
              type="text"
              v-model="cliente.nome"
              placeholder="Nome do Cliente"
            />
            <Plus
              v-if="index === clientes.length - 1"
              @click="addCustomer"
              class="plus-icon"
            />
          </span>
          <Delete
            v-if="clientes.length > 1"
            @click="deleteCustomer(index)"
            class="delete-icon"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="dataEmissao">Data de Emissão:</label>
        <input type="date" id="dataEmissao" v-model="formData.dataEmissao" />
      </div>
      <div class="form-group">
        <label for="valorTotal">Valor Total:</label>
        <input type="number" id="valorTotal" v-model="formData.valorTotal" />
      </div>
      <div class="form-group">
        <label for="itens">Itens do Pedido:</label>
        <div v-for="(item, index) in itens" :key="index">
          <div class="input-container">
            <span class="input-grid">
              <input
                type="text"
                v-model="item.produto.descricao"
                placeholder="Descrição do Produto"
              />
              <Plus
                v-if="index === itens.length - 1"
                @click="addItem"
                class="plus-icon"
              />
            </span>
            <input
              type="number"
              v-model="item.valor"
              placeholder="Preço do Produto"
            />
            <input
              type="number"
              v-model="item.quantidade"
              placeholder="Quantidade do Produto"
            />
            <Delete
              v-if="itens.length > 1"
              @click="removeItem(index)"
              class="delete-icon"
            />
          </div>
        </div>
      </div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import PlusCircle from "vue-material-design-icons/PlusCircle.vue";
import Delete from "vue-material-design-icons/Delete.vue";

const router = useRouter();

const props = defineProps({
  formTitle: String,
  submitButtonText: String,
  initialFormData: Object,
});

const emit = defineEmits(["submit"]);

function goBack() {
  router.go(-1);
}

const clientes = ref([{ id: "", nome: "" }]);
const produtos = ref([{ id: "", descricao: "" }]);
const itens = ref([
  { id: "", produto: produtos.value, valor: "", quantidade: "" },
]);

const formData = ref(
  props.initialFormData || {
    cliente: clientes.value,
    dataEmissao: "",
    valorTotal: 0,
    itens: itens.value,
  }
);

const addItem = () => {
  itens.value.push({
    id: "",
    produto: produtos.value,
    valor: "",
    quantidade: "",
  });
};

const removeItem = (index: number) => {
  itens.value.splice(index, 1);
};

const addCustomer = () => {
  clientes.value.push({ id: "", nome: "" });
};

const deleteCustomer = (index: number) => {
  clientes.value.splice(index, 1);
};

const submitForm = () => {
  if (!formData.value.dataEmissao) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Por favor, preencha a Data de Emissão",
    });
    return;
  }
  if (formData.value.valorTotal <= 0) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "O Valor Total deve ser maior que zero",
    });
    return;
  }
  emit("submit", formData.value);
};
</script>

<style scoped lang="scss">
.container {
  max-width: 400px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-icon {
  cursor: pointer;
  animation: colorTransition 2s infinite alternate;
}

@keyframes colorTransition {
  0% {
    color: darkblue;
  }
  50% {
    color: rgb(110, 200, 231);
  }
  100% {
    color: darkblue;
  }
}

.form-title {
  flex-grow: 1;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-field {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.delete-icon,
.plus-icon {
  cursor: pointer;
  font-size: 20px;
  color: red;
  width: 10%;
}

.plus-icon-customer {
  position: absolute;
  top: 20%;
  cursor: pointer;
  font-size: 20px;
  color: red;
  width: 10%;
}

.delete-icon {
  position: absolute;
  top: 25%;
  right: 12%;
  cursor: pointer;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-container input {
  margin: 10px 0px;
}

.input-grid {
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
}
</style>

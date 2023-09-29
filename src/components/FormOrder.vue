<template>
  <div class="container">
    <div class="header">
      <font-awesome-icon
        :icon="['fas', 'arrow-circle-left']"
        @click="goBack"
        class="arrow-icon"
        size="xl"
      />
      <h2 class="form-title">{{ formTitle }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="clientes">Nome do Cliente:</label>
        <div class="input-container">
          <input
            type="text"
            v-model="formData.cliente.nome"
            placeholder="Nome do Cliente"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="dataEmissao">Data de Emissão:</label>
        <input type="date" id="dataEmissao" v-model="formData.dataEmissao" />
      </div>
      <div class="form-group">
        <label for="itens">Itens do Pedido:</label>
        <div v-for="(item, index) in formData.itens" :key="index">
          <div class="input-container">
            <input
              type="text"
              v-model="item.produto.descricao"
              placeholder="Descrição do Produto"
            />
            <input
              type="number"
              :value="item.valor !== 0 ? item.valor : false"
              @input="item.valor = parseFloat($event.target.value)"
              placeholder="Preço do Produto"
            />
            <input
              type="number"
              :value="item.quantidade !== 0 ? item.quantidade : false"
              @input="item.quantidade = parseInt($event.target.value)"
              placeholder="Quantidade do Produto"
            />
            <font-awesome-icon
              class="plus-circle-icon"
              icon="plus-circle"
              v-if="index === formData.itens.length - 1"
              @click="addItem"
              size="xl"
            />
            <font-awesome-icon
              class="delete-icon"
              icon="trash"
              v-if="formData.itens.length > 1"
              @click="removeItem(index)"
              size="xl"
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
import PlusCircle from "vue-material-design-icons/PlusCircle.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import { showErrorAlert } from "@/utils/alerts";

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

let lastProductID = ref(1);
let lastItemID = ref(1);

function generateItemID() {
  lastItemID.value += 1;
  return lastItemID.value;
}

function generateProductID() {
  lastProductID.value += 1;
  return lastProductID.value;
}

const addItem = () => {
  formData.value.itens.push({
    id: generateItemID(),
    produto: { id: generateProductID(), descricao: "" },
    valor: "",
    quantidade: "",
  });
};

const formData = ref(
  props.initialFormData || {
    cliente: { nome: "" },
    dataEmissao: "",
    valorTotal: "",
    itens: [
      {
        id: generateItemID(),
        produto: { id: generateProductID(), descricao: "" },
        valor: "",
        quantidade: "",
        subtotal: "",
      },
    ],
  }
);

const removeItem = (index: number) => {
  formData.value.itens.splice(index, 1);
};

const submitForm = () => {
  if (!formData.value.cliente.nome) {
    showErrorAlert("Por favor, preencha o nome do cliente.");
    return;
  }
  if (!formData.value.dataEmissao) {
    showErrorAlert("Por favor, preencha a data de emissão.");
    return;
  }
  if (!formData.value.itens[0].produto.descricao) {
    showErrorAlert("Por favor, preencha a descrição do produto 1.");
    return;
  }
  if (!formData.value.itens[0].valor) {
    showErrorAlert("Por favor, preencha o valor do produto 1.");
    return;
  }
  if (!formData.value.itens[0].quantidade) {
    showErrorAlert("Por favor, preencha a quantidade do produto 1.");
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

.input-container {
  width: 100%;
}

.input-container input {
  margin: 10px 0px;
}

.delete-icon {
  cursor: pointer;
  color: green;
}

.plus-circle-icon {
  cursor: pointer;
  color: red;
}
</style>

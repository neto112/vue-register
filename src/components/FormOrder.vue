<template>
  <div class="container">
    <div class="header">
      <ArrowLeft @click="goBack" class="arrow-icon" />
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
            <Plus v-if="index === formData.itens.length - 1" @click="addItem" />
            <Delete
              v-if="formData.itens.length > 1"
              @click="removeItem(index)"
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
  if (!formData.value.dataEmissao) {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Por favor, preencha a Data de Emissão",
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

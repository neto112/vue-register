// pedidosModule.ts
import { Commit } from 'vuex';
import { IOrdersState, IOrder } from '@/interface/orders';
import api from '@/api';

const state: IOrdersState = {
  pedidos: [],
  clientes: [],
  produtos: [],
};

const mutations = {
  setPedidos(state: IOrdersState, pedidos: IOrder[]) {
    state.pedidos = pedidos;
  },
  addOrder(state: IOrdersState, order: IOrder) {
    state.pedidos = [...state.pedidos, order]
  },
  editOrder(state: IOrdersState, editedOrder: IOrder) {
    const index = state.pedidos.findIndex(order => order.id === editedOrder.id);
    if (index !== -1) {
      state.pedidos[index] = editedOrder;
    }
  },
  deleteOrder(state: IOrdersState, orderId: number) {
    state.pedidos = state.pedidos.filter(order => order.id !== orderId);
  },
};

const actions = {
  async fetchPedidos({ commit }: { commit: Commit }) {
    try {
      const response = await api.getOrders();
      if (response.status === 200) {
        commit('setPedidos', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  },
  async createOrder({ commit }: { commit: Commit }, order: IOrder) {
    try {
      // SUBTOTAL
      order.itens.forEach((item) => {
        if (item.valor !== null && item.quantidade !== null) {
          item.subtotal = item.valor * item.quantidade
        }
      })
      // VALOR TOTAL
      order.valorTotal = order.itens.reduce((total, item) => {
        if (item.subtotal !== null) {
          return total + item.subtotal
        } else {
          return total;
        }
      }, 0);

      const response = await api.addOrder(order);
      if (response.status === 201) {
        commit('addOrder', response.data);
      }
    } catch (error) {
      console.error('Erro ao criar um pedido:', error);
    }
  },
  async updateOrder({ commit }: { commit: Commit }, order: IOrder) {
    try {
      order.itens.forEach((item) => {
        if (item.valor !== null && item.quantidade !== null) {
          item.subtotal = item.valor * item.quantidade
        }
      })
      order.valorTotal = order.itens.reduce((total, item) => {
        if (item.subtotal !== null) {
          return total + item.subtotal
        } else {
          return total;
        }
      }, 0);

      const response = await api.editOrder(order);
      if (response.status === 200) {
        commit('editOrder', response.data);
      }
    } catch (error) {
      console.error('Erro ao editar um pedido:', error);
    }
  },
  async deleteOrder({ commit }: { commit: Commit }, orderId: number) {
    try {
      const response = await api.deleteOrder(orderId);
      if (response.status === 204) {
        commit('deleteOrder', orderId);
      }
    } catch (error) {
      console.error('Erro ao excluir um pedido:', error);
    }
  },
};
const getters = {
  getOrderById: (state: IOrdersState) => (id: number) => {
    return state.pedidos.find((p) => p.id === id);
  },
};

const pedidosModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default pedidosModule;

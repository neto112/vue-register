import { IOrder, IOrderState } from '../interface/order';
import api from '../api';
import { Commit } from 'vuex';

const state: IOrderState = {
  orders: [],
};

const mutations = {
  setOrders(state: IOrderState, orders: IOrder[]) {
    state.orders = orders;
  },
  // addOrder(state: IOrderState, order: IOrder) {
  //   state.orders = [...state.orders, order]
  // },
  // editOrder(state: IOrderState, editedOrder: IOrder) {
  //   const index = state.orders.findIndex(order => order.id === editedOrder.id);
  //   if (index !== -1) {
  //     state.orders[index] = editedOrder;
  //   }
  // },
  // deleteOrder(state: IOrderState, orderId: number) {
  //   state.orders = state.orders.filter(order => order.id !== orderId);
  // },
};

const actions = {
  async loadOrders({ commit }: { commit: Commit }) {
    try {
      const response = await api.getOrders();
      console.log("oi", response);

      if (response.status === 200) {
        commit('setOrders', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  },
  // async createOrder({ commit }: { commit: Commit }, order: IOrder) {
  //   try {
  //     const response = await api.addOrder(order);
  //     if (response.status === 201) {
  //       commit('addOrder', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao criar um pedido:', error);
  //   }
  // },
  // async updateOrder({ commit }: { commit: Commit }, order: IOrder) {
  //   try {
  //     const response = await api.editOrder(order);
  //     if (response.status === 200) {
  //       commit('editOrder', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao editar um pedido:', error);
  //   }
  // },
  // async deleteOrder({ commit }: { commit: Commit }, orderId: number) {
  //   try {
  //     const response = await api.deleteOrder(orderId);
  //     if (response.status === 204) {
  //       commit('deleteOrder', orderId);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao excluir um pedido:', error);
  //   }
  // },
};

export const ordersModule = {
  state, mutations, actions, namespace: true,
}
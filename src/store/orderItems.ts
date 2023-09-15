// import { IOrderItem, IOrderItemState } from '../interface/order';
// import api from '../api';
// import { Commit } from 'vuex';

// const state: IOrderItemState = {
//   itemsPedidos: [],
// };

// const mutations = {
//   setOrderItems(state: IOrderItemState, orderItems: IOrderItem[]) {
//     state.itemsPedidos = orderItems;
//   },
//   addOrderItem(state: IOrderItemState, orderItem: IOrderItem) {
//     state.itemsPedidos = [...state.itemsPedidos, orderItem];
//   },
//   editOrderItem(state: IOrderItemState, editedOrderItem: IOrderItem) {
//     const index = state.itemsPedidos.findIndex(item => item.id === editedOrderItem.id);
//     if (index !== -1) {
//       state.itemsPedidos[index] = editedOrderItem;
//     }
//   },
//   deleteOrderItem(state: IOrderItemState, orderItemId: number) {
//     state.itemsPedidos = state.itemsPedidos.filter(item => item.id !== orderItemId);
//   },
// };

// const actions = {
//   async loadOrderItems({ commit }: { commit: Commit }, pedidoId: number) {
//     try {
//       const response = await api.getOrderItems(pedidoId);
//       commit('setOrderItems', response.data);
//     } catch (error) {
//       console.error('Erro ao buscar os itens de pedido:', error);
//     }
//   },
//   async createOrderItem({ commit }: { commit: Commit }, { pedidoId, orderItem }: { pedidoId: number, orderItem: IOrderItem }) {
//     try {
//       const response = await api.addOrderItem(pedidoId, orderItem);
//       if (response.status === 201) {
//         commit('addOrderItem', response.data);
//       }
//     } catch (error) {
//       console.error('Erro ao criar um item de pedido:', error);
//     }
//   },
//   async updateOrderItem({ commit }: { commit: Commit }, { pedidoId, orderItem }: { pedidoId: number, orderItem: IOrderItem }) {
//     try {
//       const response = await api.editOrderItem(pedidoId, orderItem);
//       if (response.status === 200) {
//         commit('editOrderItem', response.data);
//       }
//     } catch (error) {
//       console.error('Erro ao editar um item de pedido:', error);
//     }
//   },
//   async deleteOrderItem({ commit }: { commit: Commit }, { pedidoId, orderItemId }: { pedidoId: number, orderItemId: number }) {
//     try {
//       const response = await api.deleteOrderItem(pedidoId, orderItemId);
//       if (response.status === 204) {
//         commit('deleteOrderItem', orderItemId);
//       }
//     } catch (error) {
//       console.error('Erro ao excluir um item de pedido:', error);
//     }
//   },
// };

// export const orderItemsModule = {
//   state, mutations, actions, namespace: true,
// };

import axios from 'axios';
import { IPerson } from '@/interface/people'
import { IProduct } from './interface/product';
// import { IOrder } from './interface/order';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {
  // PESSOAS
  async getPeople() {
    return await api.get('/pessoas')
  },
  async addPerson(person: IPerson) {
    return await api.post('/pessoas', person)
  },
  async editPerson(person: IPerson) {
    return await api.put(`/pessoas/${person.id}`, person)
  },
  async deletePerson(id: number) {
    return await api.delete(`/pessoas/${id}`);
  },

  // PRODUTOS
  async getProducts() {
    return await api.get('/produtos');
  },

  async addProduct(product: IProduct) {
    return await api.post('/produtos', product);
  },

  async editProduct(product: IProduct) {
    return await api.put(`/produtos/${product.id}`, product);
  },

  async deleteProduct(id: number) {
    return await api.delete(`/produtos/${id}`);
  },

  // PEDIDOS
  async getOrders() {
    return await api.get('/pedidos');
  },

  // async addOrder(order: IOrder) {
  //   return await api.post('/pedidos', order);
  // },

  // async editOrder(order: IOrder) {
  //   return await api.put(`/pedidos/${order.id}`, order);
  // },

  // async deleteOrder(id: number) {
  //   return await api.delete(`/pedidos/${id}`);
  // },

  // // ITENS
  // async getOrderItems(pedidoId: number) {
  //   return await api.get(`/pedidos/${pedidoId}/itens`);
  // },

  // async addOrderItem(pedidoId: number, orderItem: IOrderItem) {
  //   return await api.post(`/pedidos/${pedidoId}/itens`, orderItem);
  // },

  // async editOrderItem(pedidoId: number, orderItem: IOrderItem) {
  //   return await api.put(`/pedidos/${pedidoId}/itens/${orderItem.id}`, orderItem);
  // },

  // async deleteOrderItem(pedidoId: number, itemId: number) {
  //   return await api.delete(`/pedidos/${pedidoId}/itens/${itemId}`);
  // },

  // // CLIENTES
  // async getCustomers(pedidoId: number) {
  //   return await api.get(`/pedidos/${pedidoId}/clientes`);
  // },

  // async addCustomer(pedidoId: number, customer: ICustomer) {
  //   return await api.post(`/pedidos/${pedidoId}/clientes`, customer);
  // },

  // async editCustomer(pedidoId: number, customer: ICustomer) {
  //   return await api.put(`/pedidos/${pedidoId}/clientes/${customer.id}`, customer);
  // },

  // async deleteCustomer(pedidoId: number, customerId: number) {
  //   return await api.delete(`/pedidos/${pedidoId}/clientes/${customerId}`);
  // },
}


import { createRouter, createWebHashHistory } from 'vue-router'
import MainComponent from '../MainComponent.vue'
import DashboardView from "../views/DashboardView.vue"
import ListOfPeople from "../views/People/ListOfPeople.vue"
import AddPerson from '../views/People/AddPerson.vue'
import EditPerson from '../views/People/EditPerson.vue'
import ListOfProducts from '../views/Products/ListOfProducts.vue'
import AddProduct from '../views/Products/AddProduct.vue'
import EditProduct from '../views/Products/EditProduct.vue'
import ListOfOrders from '../views/Orders/ListOfOrders.vue'
import AddOrder from '../views/Orders/AddOrder.vue'
import EditOrder from '../views/Orders/EditOrder.vue'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/', component: MainComponent,
      children: [
        { path: '/dashboard', component: DashboardView },
        { path: '/lista-pessoa', component: ListOfPeople },
        { path: '/adicionar-pessoa', component: AddPerson },
        { path: '/editar-pessoa/:id', name: "editar-pessoa", component: EditPerson, props: true },

        { path: '/lista-produto', component: ListOfProducts },
        { path: '/adicionar-produto', component: AddProduct },
        { path: '/editar-produto/:id', name: "editar-produto", component: EditProduct, props: true },

        { path: '/lista-pedido', component: ListOfOrders },
        { path: '/adicionar-pedido', component: AddOrder },
        { path: '/editar-pedido/:id', name: "editar-pedido", component: EditOrder, props: true },
      ]
    },
  ]
})

router.beforeEach((to, _from, next) => {
  if (to.path === "/") {
    next("/dashboard")
  } else {
    next();
  }
})

export default router

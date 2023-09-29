import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import FontAwesomeIcon from "./icons/fontawesome-icons";

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).use(router).mount('#app')

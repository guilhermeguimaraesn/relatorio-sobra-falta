import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeRel.vue'
import DetailsRel from '../views/DetailsRel.vue'
import EditarRel from '../views/EditRel.vue'
import NovoRel from '../views/NovoRel.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/novo-relatorio',
    name: 'NovoRelatorio',
    component: NovoRel
  },
  {
    path: '/detalhes/:indice',
    name: 'DetalhesRel',
    component: DetailsRel,
    props: true
  },
  {
    path: '/editar/:indice',
    name: 'EditarRel',
    component: EditarRel,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

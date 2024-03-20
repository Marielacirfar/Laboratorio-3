import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NegociacionView from '../views/NegociacionView';
import RegistroView from '../views/RegistroView';
import HistorialView from '../views/HistorialView';
import EstadoActualView from '../views/EstadoActualView';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },

  {
    path: '/RegistroComponent',
    name: 'RegistroComponent',
    component: RegistroView,
  },
  {
    path: '/InicioComp',
    name: 'InicioComp',
    component: () => import('../components/InicioComp.vue')
  },
  {
    path: '/AnalisisInver',
    name: 'AnalisisInver',
    component: () => import('../components/AnalisisInver.vue')
  },
  {
    path: '/NegociacionComp',
    name: 'NegociacionComp',
    component: NegociacionView,
  },
  {
    path: '/HistorialMov',
    name: 'HistorialMov',
    component: HistorialView,
  },
  {
    path: '/EstadoActual',
    name: 'EstadoActual',
    component: EstadoActualView,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

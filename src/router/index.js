import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Company from '../views/company/Company.vue';
import ListCompanies from '../views/company/ListCompanies.vue';
import Supplier from '../views/supplier/Supplier.vue';
import ListSuppliers from '../views/supplier/ListSuppliers.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/empresas',
    name: 'ListCompanies',
    component: ListCompanies
  },
  {
    path: '/empresas/:id',
    name: 'Company',
    component: Company
  },
  {
    path: '/fornecedores',
    name: 'ListSuppliers',
    component: ListSuppliers
  },
  {
    path: '/fornecedores/:id',
    name: 'Supplier',
    component: Supplier
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

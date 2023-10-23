import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ProductsView from '../views/ProductsView.vue'
import AdminView from '../views/AdminView.vue'
import CreateAccount from '../views/CreateAccount.vue'
import {auth} from '../firebase/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/products/details/:id',
      name:'Detail',
      component:DetailView,
      props:true
    },
    {
      path:'/products',
      name:'Products',
      component:ProductsView
    },
    {
      path:'/admin/dashboard',
      name:'Admin',
      component:AdminView
    },
    {
      path:'/createAccount',
      name:'createAccount',
      component:CreateAccount,
      beforeEnter(to,from,next){
        if(!auth.currentUser){
          return next();
        }else{
          return next('/');
        }
      }
    }
  ]
});

router.beforeEach((to, from,next) => {
  document.title = `Spring Shop | ${to.name}`
  next();
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import menuView from '../components/menuView'
import collection from '../components/collection'
import mineView from '../components/mineView'
import stepsFoods from '../components/second/stepsFoods'
import search from '../components/second/search'
import success from '../components/second/SuccessLogin'
// import makingMenu from '../components/second/makingMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/menu', name: 'menu', component: menuView},
    {path: '/collection', component: collection},
    {path: '/mine', component: mineView},
    {path: '/stepsFoods', name: 'steps', component: stepsFoods},
    {path: '/search', name: 'search', component: search},
    {path: '/success', name: 'success', component: success}
    // {path: '/makingMenu', name: 'makingMenu', component: makingMenu}
  ],
  linkActiveClass: 'active'
})

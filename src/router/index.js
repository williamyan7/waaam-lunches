import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import CurrentPairing from '@/components/CurrentPairing'
import EditProfile from '@/components/EditProfile'
import About from '@/components/About'
import AdminDashboard from '@/components/AdminDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/editprofile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/currentpairing',
      name: 'CurrentPairing',
      component: CurrentPairing
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard
    }
  ]
})

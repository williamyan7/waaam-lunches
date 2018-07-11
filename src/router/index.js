import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import CurrentPairing from '@/components/CurrentPairing'
import EditProfile from '@/components/EditProfile'
import About from '@/components/About'
import AdminDashboard from '@/components/AdminDashboard'
import NotFound from '@/components/NotFound'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LandingPage', component: LandingPage,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = firebase.auth().currentUser
        if(isAuthenticated) {
          next('CurrentPairing')
        } else {
          next()
        }
      }},
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/login', name: 'Login', component: Login },
    { path: '/editprofile', name: 'EditProfile', component: EditProfile, meta: { requiresAuth: true } },
    { path: '/about', name: 'About', component: About },
    { path: '/currentpairing', name: 'CurrentPairing', component: CurrentPairing, meta: { requiresAuth: true } },
    { path: '/admin', name: 'AdminDashboard', component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        var email = firebase.auth().currentUser.email
        const isAdmin = (email == 'williamyan7@gmail.com' || email == 'willyan@wharton.upenn.edu' )
        if(isAdmin) {
          next()
        } else {
          next('/')
        }
      }},
    { path: '*', name: 'NotFound', component: NotFound }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

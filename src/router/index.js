import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Blog from '@/views/Blog'
import Note from '@/views/Note'
import Edit from '@/views/Edit'
import Index from '@/views/Index'
import Time from '@/views/Time'
import Photo from '@/views/Photo'
import login from '@/views/login'
import Detail from '@/views/Detail'
import View_404 from '@/views/404'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Time',
      name: 'Time',
      component: Time
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog,
      children: []
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      children: []
    },
    {
      path: '/Note',
      name: 'Note',
      component: Note
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/Photo',
      name: 'Photo',
      component: Photo,
    },
    {
      path: '/404',
      name: '404',
      component: View_404,
    }
  ]
})

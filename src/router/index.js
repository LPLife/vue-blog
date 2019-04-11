import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Blog from '@/views/Blog'
import Note from '@/views/Note'
import Person from '@/views/Person'
import Index from '@/views/Index'
import Time from '@/views/Time'
import Photo from '@/views/Photo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index
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
      children: [ ]
    },
    {
      path: '/Note',
      name: 'Note',
      component: Note
    },
    {
      path: '/Person',
      name: 'Person',
      component: Person,
    },
    {
      path: '/Photo',
      name: 'Photo',
      component: Photo,
    }
  ]
})

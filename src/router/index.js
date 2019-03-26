import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/Blog'
import Note from '@/components/Note'
import Person from '@/components/Person'
import Index from '@/components/Index'
import Time from '@/components/Time'

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
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'
import Means from '@/components/Means'
import Person from '@/components/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Foo',
      name: 'Foo',
      component: Foo
    },
    {
      path:'/Bar',
      name:'Bar',
      component:Bar,
      children:[{
        path:'/Means',
        name:'Means',
        component:Means,
      },
      {
        path:'/Person',
        name:'Person',
        component:Person,
      }
    ]
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/style/reset.less'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui';
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false;
axios({
    method: 'post',
    url: 'http://xiny.wh66.cn/api/help/index',
    data: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cud2lzaC5jb21cL2FwaVwvaW52aXRlXC9pbmRleCIsImlhdCI6MTU1NjE4MzI4NSwiZXhwIjoxNTU2MjQ1NDY0LCJuYmYiOjE1NTYyNDE4NjQsImp0aSI6ImRJN2oxTk1Zd2FCdzVSaDMiLCJzdWIiOjEsInBydiI6IjFiYjQ1NzE3YjMzMDc0OTVmNTk1ZDc5OGVlNzA0YTUwZmQyOTRiMDMifQ._j6QiU14DJzusMb35pXrqpsBI3AoRoJpV3kaMWRwigk'
    }
}).then(res => {
    res = res.data;
    console.log(res);
}).catch(err => {

});
router.beforeEach((to, from, next) => {
        console.log(to);
        console.log(from);
        next();
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
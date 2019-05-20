// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.less'
import Vuex from 'vuex'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import animate from 'animate.css'
import store from './store/index'
import LightTimeline from 'vue-light-timeline';
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll);
Vue.use(LightTimeline);
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(animate)
Vue.use(Vuex)
Vue.config.lang = 'zh-cn'
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
        console.log(to);
        console.log(from);
        next();
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

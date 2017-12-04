import Vue from "vue/dist/vue.esm";
import App from "./App.vue";
import store from "./store/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import moment from "moment";
import curvejs from "curvejs";

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$moment', {value: moment});
Object.defineProperty(Vue.prototype, '$curvejs', {value: curvejs});
Vue.use(ElementUI);
locale.use(lang);

new Vue({
          el: '#app',
          store,
          render: h => h(App)
        });

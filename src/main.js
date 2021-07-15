/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import Vuelidate from 'vuelidate';
import Fragment from 'vue-fragment';
import PortalVue from 'portal-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App';
import router from './router';
import store from './store';

import './app.scss';
import './config/leaflet';

Vue.config.productionTip = false;

Vue.use(PortalVue);
Vue.use(Fragment.Plugin);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueObserveVisibility);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

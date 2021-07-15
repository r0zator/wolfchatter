import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import message from './modules/message.store';
import room from './modules/room.store';
import user from './modules/user.store';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
    },
    modules: {
        user,
        message,
        room,
    },
    mutations: {
    },
    plugins: [createPersistedState()],
});

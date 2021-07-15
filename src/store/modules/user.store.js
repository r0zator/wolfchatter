/* eslint-disable no-unused-vars */
import Vue from 'vue';
import service from '../../service/user.firebase';

export default {
    namespaced: true,
    state: {
        currentUser: null,
    },
    getters: {
        currentUser(state) {
            return state.currentUser;
        },
    },
    mutations: {
        setUser(state, user) {
            Vue.set(state, 'currentUser', user);
        },
    },
    actions: {
        async addUser({ commit }, userId) {
            await service.addUser(userId);
            commit('setUser', userId);
        },
    },
};

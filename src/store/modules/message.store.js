/* eslint-disable no-unused-vars */
import Vue from 'vue';
import service from '../../service/message.firebase';
import { firebase } from '../../config/firebase';

export default {
    namespaced: true,
    state: {
        currentMessages: [],
    },
    getters: {
        currentMessages(state) {
            return state.currentMessages;
        },
    },
    mutations: {
        setCurrentMessages(state, messages) {
            Vue.set(state, 'currentMessages', messages);
        },
        removeCurrentMessages(state) {
            Vue.set(state, 'currentMessages', []);
        },
    },
    actions: {
        async addMessage({ commit }, payload) {
            await service.addMessage(payload);
        },
        async getAllMessages({ commit }, roomId) {
            commit('setCurrentMessages', []);
            const messages = await service.getAllMessages(roomId);
            commit('setCurrentMessages', messages || []);

            firebase.database().ref(`messages/${roomId}`).on('child_added', (data) => {
                commit('setCurrentMessages', data.val() || []);
            });
            firebase.database().ref(`messages/${roomId}`).on('child_changed', (data) => {
                commit('setCurrentMessages', data.val() || []);
            });
        },
    },
};

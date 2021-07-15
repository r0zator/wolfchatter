/* eslint-disable no-unused-vars */
import Vue from 'vue';
import service from '../../service/message.firebase';
import { firebase } from '../../config/firebase';

export default {
    namespaced: true,
    state: {
        currentMessages: {},
    },
    getters: {
        // one room can be opened at a moment and
        // we need messages for room x that is opened by user y
        currentMessages(state, getters, rootState) {
            return state.currentMessages[rootState.room.currentRoom[rootState.user.currentUser].key];
        },
    },
    mutations: {
        setCurrentMessages(state, { roomId, messages }) {
            Vue.set(state.currentMessages, roomId, messages);
        },
        removeCurrentMessages(state, roomId) {
            Vue.set(state.currentMessages, roomId, []);
        },
    },
    actions: {
        async addMessage({ commit }, payload) {
            await service.addMessage(payload);
        },
        async getAllMessages({ commit, rootState }, roomId) {
            const messages = await service.getAllMessages(roomId);
            commit('setCurrentMessages', { roomId, messages: messages || [] });

            firebase.database().ref(`messages/${roomId}`).on('child_added', (data) => {
                commit('setCurrentMessages', { roomId, messages: data.val() || [] });
            });
            firebase.database().ref(`messages/${roomId}`).on('child_changed', (data) => {
                commit('setCurrentMessages', { roomId, messages: data.val() || [] });
            });
        },
    },
};

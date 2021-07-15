/* eslint-disable no-unused-vars */
import Vue from 'vue';
import service from '../../service/room.firebase';
import { firebase } from '../../config/firebase';

export default {
    namespaced: true,
    state: {
        currentRoom: null,
        listOfRooms: [],
    },
    getters: {
        currentRoom(state) {
            return state.currentRoom;
        },
        listOfRooms(state) {
            return state.listOfRooms;
        },
    },
    mutations: {
        setCurrentRoom(state, room) {
            Vue.set(state, 'currentRoom', room);
        },
        setRooms(state, rooms) {
            Vue.set(state, 'listOfRooms', rooms);
        },
        removeCurrentRoom(state) {
            Vue.set(state, 'currentRoom', null);
        },
        removeRoomFromList(state, room) {
            const rooms = state.listOfRooms.filter((rm) => rm.key !== room.key);
            Vue.set(state, 'listOfRooms', rooms);
        },
        addRoomToList(state, room) {
            const rooms = _.cloneDeep(state.listOfRooms);
            const roomFound = rooms.some((rm) => rm.key === room.key);
            if (!roomFound) {
                rooms.push(room);
                Vue.set(state, 'listOfRooms', rooms);
            }
        },
    },
    actions: {
        async addRoom({ commit }, payload) {
            const key = await service.addRoom(payload);
            commit('setCurrentRoom', { ...payload, key });
        },
        async removeRoom({ commit }, roomId) {
            await service.removeRoom(roomId);
            commit('removeCurrentRoom');
        },
        async getAllRooms({ commit }) {
            const rooms = await service.getAllRooms();
            commit('setRooms', rooms);

            firebase.database().ref('rooms').on('child_added', (data) => {
                commit('addRoomToList', data.val());
            });

            firebase.database().ref('rooms').on('child_removed', (data) => {
                commit('removeRoomFromList', data.val());
            });
        },
    },
};

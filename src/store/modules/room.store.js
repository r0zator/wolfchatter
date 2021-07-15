/* eslint-disable no-unused-vars */
import Vue from 'vue';
import service from '../../service/room.firebase';
import { firebase } from '../../config/firebase';

export default {
    namespaced: true,
    state: {
        currentRoom: {},
        listOfRooms: [],
    },
    getters: {
        // current room for current user inside the current session
        // to overcome the possibility to override the currentRoom when more than 1 user is on the app
        currentRoom(state, getters, rootState) {
            return state.currentRoom[rootState.user.currentUser];
        },
        listOfRooms(state) {
            return state.listOfRooms;
        },
    },
    mutations: {
        setCurrentRoom(state, { room, user }) {
            Vue.set(state.currentRoom, user, room);
        },
        setRooms(state, rooms) {
            Vue.set(state, 'listOfRooms', rooms);
        },
        removeCurrentRoom(state, user) {
            Vue.set(state.currentRoom, user, null);
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
        async addRoom({ commit, rootState }, payload) {
            const key = await service.addRoom(payload);
            commit('setCurrentRoom', { room: { ...payload, key },
                user: rootState.user.currentUser });
        },
        async removeRoom({ commit, rootState }, roomId) {
            await service.removeRoom(roomId);
            commit('removeCurrentRoom', rootState.user.currentUser);
        },
        setCurrentRoom({ commit, rootState }, room) {
            commit('setCurrentRoom', { room, user: rootState.user.currentUser });
        },
        async getAllRooms({ commit, state, rootState }) {
            const rooms = await service.getAllRooms();
            commit('setRooms', rooms);

            firebase.database().ref('rooms').on('child_added', (data) => {
                commit('addRoomToList', data.val());
            });

            firebase.database().ref('rooms').on('child_removed', (data) => {
                commit('removeRoomFromList', data.val());
                // current room that is opened
                const currentRoom = state.currentRoom[rootState.user.currentUser];
                // if I have same room opened as another user - and that user deletes the room => reset my view also
                if (currentRoom && data.val().key === currentRoom.key) {
                    commit('removeCurrentRoom', rootState.user.currentUser);
                }
            });
        },
    },
};

import { firebase } from '../config/firebase';

const usersRef = firebase.database();

export default {
    async addUser(userId) {
        await usersRef.ref(`users/${userId}`).set({
            key: userId,
        });
    },
    async removeUser(userId) {
        await usersRef.ref('users').child(userId).remove();
    },
};

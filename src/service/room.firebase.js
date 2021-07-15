import { firebase } from '../config/firebase';

const roomsRef = firebase.database().ref('rooms');

export default {
    async addRoom(roomInfo) {
        const key = roomsRef.push().getKey();
        await roomsRef.child(key).set({
            ...roomInfo,
            key,
        });

        return key;
    },
    async removeRoom(roomId) {
        await roomsRef.child(roomId).remove();
    },
    async getAllRooms() {
        let rooms = [];
        await roomsRef.once('value', (snapshot) => {
            rooms = _.map(snapshot.val(), (sn) => sn);
        }, (errorObject) => {
            console.log(`The read failed: ${errorObject.name}`);
        });

        return rooms;
    },
};

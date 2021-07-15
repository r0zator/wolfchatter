import { firebase } from '../config/firebase';

const messageRef = firebase.database();

export default {
    async addMessage({ messages, roomId }) {
        await messageRef.ref(`messages/${roomId}`).set({
            messages,
        });
    },
    async getAllMessages(roomId) {
        let messages = [];
        await messageRef.ref(`messages/${roomId}`).once('value', (snapshot) => {
            messages = snapshot.val() ? snapshot.val().messages : [];
        }, (errorObject) => {
            console.log(`The read failed: ${errorObject.name}`);
        });

        return messages;
    },
};

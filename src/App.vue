<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
        }),
    },
    async created() {
        const users = firebase.database().ref('/users');
        let newId = this.currentUser;

        if (!newId) {
            newId = Math.random().toString(36).substring(7);
            users.once('value', (snapshot) => {
                const keys = _.map(snapshot.val(), (user) => user.key);
                while (keys.includes(newId)) {
                // generate random string id for the current user that;s browsing
                // keeping the ID as long as the store sessions lasts
                    newId = Math.random().toString(36).substring(7);
                }
            });
            await this.addUser(newId);
        }
    },
    methods: {
        ...mapActions({
            addUser: 'user/addUser',
        }),
    },
};
</script>

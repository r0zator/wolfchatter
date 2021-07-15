<style scoped>
    .card-size {
        min-width: 25rem;
    }

    .mg-text-user {
        color: lightskyblue;
        font-weight: bolder;
    }

    .mg-text-joiner {
        color: black;
        font-weight: bolder;
    }

    .chat-body {
        max-height: 280px;
    }
</style>
<template>
    <div>
        <b-card :title="room ? `Chatroom (${room.lat.toFixed(2)} - ${room.lng.toFixed(2)})` : ''"
                class="card-size">
            <div v-if="!room">
                Click on the map to start a chat
            </div>
            <div v-else>
                <div ref="container" class="border mb-3 chat-body overflow-auto">
                    <div v-for="(item, index) in currentMessages" :key="index"
                         class="pl-2 ml-2"
                    >
                        <span :class="`d-flex ${item.userId === currentUser
                            ? 'justify-content-end mr-2'
                            : 'justify-content-start'}`">
                            <p v-if="item.userId === currentUser">
                                {{ item.message }} :
                            </p>
                            <span :class="`${item.userId === currentUser
                                ? 'mg-text-user'
                                : 'mg-text-joiner'}`">
                                {{ getUserHeader (item) }}
                            </span>
                            <p v-if="item.userId !== currentUser">
                                : {{ item.message }}
                            </p>
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <span class="col-12">
                        <input v-model="username" type="text"
                               placeholder="Write your username here"
                               class="form-control" required>
                    </span>
                </div>
                <div class="form-group row">
                    <span class="col-8">
                        <input id="lastname"
                               v-model="message" type="text"
                               placeholder="Write your message here"
                               class="form-control" required>
                    </span>
                    <span class="col-4">
                        <button class="btn btn-primary w-100"
                                :disabled="!username || !message"
                                @click="submit">
                            Submit
                        </button>
                    </span>
                </div>
                <button v-if="room.userId === currentUser"
                        class="btn btn-sm btn-outline-danger w-100"
                        @click="remove">
                    Delete chat
                </button>
            </div>
        </b-card>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
    props: {
        room: {
            default: null,
            type: Object,
        },
        user: {
            default: null,
            type: Object,
        },
    },
    data() {
        return {
            message: null,
            username: null,
        };
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
            currentRoom: 'room/currentRoom',
            currentMessages: 'message/currentMessages',
        }),
    },
    watch: {
        room: {
            immediate: true,
            async handler(val) {
                this.message = null;
                if (val) await this.getAllMessages(val.key);
            },
        },
    },
    methods: {
        ...mapActions({
            addMessage: 'message/addMessage',
            getAllMessages: 'message/getAllMessages',
        }),
        async submit() {
            const messageFormattedDate = moment().format('DD/MM/YYYY');
            const messageObject = { userId: this.currentUser,
                username: this.username,
                message: this.message,
                date: messageFormattedDate };

            const message = {
                messages: [...this.currentMessages, messageObject],
                roomId: this.room.key,
            };

            await this.addMessage(message);
            this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
            this.message = null;
        },
        async remove() {
            this.$emit('removeRoom');
        },
        getUserHeader(message) {
            return message.userId === this.currentUser
                ? `(${message.date}) [${message.username}]`
                : `[${message.username}] (${message.date})`;
        },
    },
};
</script>

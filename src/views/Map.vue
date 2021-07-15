<style scoped>
    .map {
        width: 100% !important;
        height: 100% !important;
        z-index: 2;
    }

    .dialog {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 999;
    }
</style>
<template>
    <div class="map">
        <l-map ref="wolfchatterMap"
               :zoom="zoom"
               :center="center"
               @click="addRoomAction">
            <l-tile-layer :url="url" />
            <span v-if="listOfRooms && listOfRooms.length">
                <l-marker v-for="(roomItem, index) in listOfRooms" :key="index"
                          :lat-lng="{lat: roomItem.lat, lng: roomItem.lng}"
                          :icon="roomItem.userId === currentUser ? iconBlue : iconRed"
                          @click="setCurrentRoom(roomItem)" />
            </span>
        </l-map>
        <div class="dialog d-flex justify-content-end p-3">
            <room-dialog :room="currentRoom" @removeRoom="removeRoom(currentRoom.key)" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { icon } from 'leaflet';
import RoomDialog from '../components/room-dialog';

export default {
    name: 'Map',
    components: { RoomDialog },
    data() {
        return {
            map: null,
            center: [46.7712, 23.6236],
            zoom: 5,
            url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',

            // other rooms/markers
            iconRed: icon({
                // eslint-disable-next-line global-require
                iconUrl: require('@/assets/red_pin.png'),
                iconSize: [53, 53],
                iconAnchor: [16, 37],
            }),

            // my rooms/markers
            iconBlue: icon({
                // eslint-disable-next-line global-require
                iconUrl: require('@/assets/blue_pin.png'),
                iconSize: [32, 53],
                iconAnchor: [16, 37],
            }),
        };
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
            currentRoom: 'room/currentRoom',
            listOfRooms: 'room/listOfRooms',
        }),
    },
    async created() {
        await this.getAllRooms();
    },
    methods: {
        ...mapActions({
            getAllRooms: 'room/getAllRooms',
            addRoom: 'room/addRoom',
            removeRoom: 'room/removeRoom',
            setCurrentRoom: 'room/setCurrentRoom',
        }),
        async addRoomAction(event) {
            await this.addRoom({
                ...event.latlng,
                userId: this.currentUser,
            });
        },
    },
};
</script>

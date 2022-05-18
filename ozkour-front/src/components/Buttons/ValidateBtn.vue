<script>
// import {ref} from "vue";
import axios from "axios";
import { useTalkStore } from "../../stores/talks";

export default {

    data() {
        const talk = useTalkStore()
        console.log('talks', talk);

        function sendTalks() {
            axios
            .post('http://localhost:3000/selected-talks', talk)
            .then((response) => console.log('res :',response))
        }

        return {
            selectedTalks: {
                date: talk[4],
                universe: talk[3],
                eventType: talk[1],
                eventName: talk[2],
                talkTitle: talk[6],
                speakers: talk[5],
            },
            sendTalks,

        }
    },
};

</script>

<template>
    <button type="button" class="validate-btn" @click="sendTalks" >VALIDER</button>
</template>

<style scoped>
    .validate-btn{
        /* width: 15%; */
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: #FFFFFF;
        font-size: 18px;
        font-weight: 800;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        padding: 10px 30px;
        cursor: pointer;
    }
    .validate-btn:hover {
        background: black;
        color: white;
    }
</style>
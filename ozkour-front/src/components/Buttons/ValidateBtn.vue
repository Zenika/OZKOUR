<script setup>
// import {ref} from "vue";
import axios from "axios";
import { useTalkStore } from "../../stores/talks";


const talk = useTalkStore()

    function sendTalks() {
        console.log('talks', talk.getSelectedTalks);
        axios
        .post('http://localhost:3000/selected-talks', talk.getSelectedTalks)
        .then((response) => console.log('res :',response))
    }

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
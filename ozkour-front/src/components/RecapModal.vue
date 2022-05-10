<script setup>
import ValidateBtn from './Buttons/ValidateBtn.vue'
import { useTalkStore } from '../stores/talks'
// import { dateStart, dateEnd } from '../components/ChoosingDate.vue'

const talk = useTalkStore()
console.log(talk)

</script>

<template>
    <div class="popUp-bg">
        <div class="popUp-header">
            <button type="button" class="close" @click="$emit('close')"> X </button>
            <h2>Récapitulatif</h2>
        </div>

        <div class="recap">
            <div class="recap-details">
                <div class="icon-bg">
                    <img src="../assets/images/gallery.png" alt="calendar" class="icon">
                </div>
                <p><b>Visuel : </b>{{ talk.template }}</p>
            </div>
            <div class="recap-details">
                <div class="icon-bg">
                    <img src="../assets/images/calendar.png" alt="calendar" class="icon">
                </div>
                <p><b>Dates : {{ dateStart }} au {{ dateEnd }}</b></p>
            </div>
            <div>
                <div class="recap-details">
                    <div class="icon-bg">
                        <img src="../assets/images/microphone.png" alt="calendar" class="icon">
                    </div>
                    <p><b>Liste des talks : </b></p>
                </div>
                <ul v-for="talk in talk.selected" v-bind:key="talk" class="events">
                    <li>{{ talk.talkTitle }}</li>
                </ul>
            </div>
        </div>

        <div class="validate">
            <ValidateBtn />
        </div>

    </div>
</template>

<style scoped>
    .popUp-bg {
        width: 30%;;
        top: 30%;
        bottom: auto;
        background: #F2F2F2;
        position: absolute;
        z-index: 20;
        transform: 'translate(-50%, -50%)';
        border-radius: 20px;
    }

    .popUp-header{
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        border-radius: 20px 20px 0px 0px;
    }

    .close {
        position: absolute;
        left: 5%;
        align-self: flex-start;
        border: none;
        color: white;
        font-family: 'Open Sans', sans-serif;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        padding-top: 10px;
        background: transparent;
    }

    .recap{
        /* width: 100%; */
        color: black;
        padding: 0px 20px;
    }

    .icon-bg {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        padding: 2px;
    }

    .icon {
        width: 20px;
    }

    .recap-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .events {
        margin: 0px;
        padding-left: 60px;
    }

    .validate {
        display: flex;
        justify-content: center;
        padding: 30px 0px;
    }

</style>
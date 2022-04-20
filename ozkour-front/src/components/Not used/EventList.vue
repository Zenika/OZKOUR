<template>
    <div class="eventDetails">
        <div class="details">
            <p class="detail">DATE</p>
            <ul>
                <li>15/04/2021</li>
            </ul>
        </div>
        <div class="details">
            <p class="detail">UNIVERS</p>
            <ul>
                <li>GREEN IT</li>
            </ul>
        </div>
        <div class="details">
            <p class="detail">TYPE</p>
            <ul>
                <li>Webinar</li>
            </ul>
        </div>
        <div class="details">
            <p class="detail">NOM DE L'EVENEMENT</p>
            <ul>
                <li>FCC AfterLab</li>
            </ul>
        </div>
        <div class="details">
            <p class="detail">TITRE DU TALK</p>
            <ul>
                <li>Sustainable IT: towards a new culture</li>
            </ul>
        </div>
        <div class="details">
            <p class="detail">SPEAKER</p>
            <ul>
                <li>Adrien Nortain</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useTalkStore } from '../../stores/talks'

const talk = useTalkStore()
setInterval(function(){
    console.log(talk.talks)
},1000);



</script>

<style scoped>
    .eventDetails {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .detail {
        font-weight: 600;
    }
</style>
<template>
    <div class="eventDetails">
        <table>
            <tr>
                <th scope="col">DATE</th>
                <th scope="col">UNIVERS</th>
                <th scope="col">TYPE</th>
                <th scope="col">NOM DE L'EVENEMENT</th>
                <th scope="col">TITRE DU TALK</th>
                <th scope="col">SPEAKER</th>
            </tr>
            <div v-for="talk in talk.talks[0]" v-bind:key="talk"> 
            <tr >
                <td scope="col">{{talk[0]}}</td>
                <td scope="col">{{talk[1]}}</td>
                <td scope="col">{{talk[2]}}</td>
                <td scope="col">{{talk[3]}}</td>
                <td scope="col">{{talk[4]}}</td>
                <td scope="col">{{talk[5]}}</td>
            </tr>
            </div>

        </table>
    </div>
</template>

<script setup>
import { useTalkStore } from '../stores/talks'

const talk = useTalkStore()
// setInterval(function(){
    console.log(talk.talks)
// },1000);



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
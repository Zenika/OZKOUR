<template>
    <h2 v-if="talk.talks==''">Pas de talks entre les dates recherchées</h2>
    <div v-else>
        <h2>Liste des événements sélectionnés</h2>
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
                <tr v-for="talk in talk.talks[0]" v-bind:key="talk[0]">
                    <td>{{talk[4]}}</td>
                    <td>{{talk[3]}}</td>
                    <td>{{talk[1]}}</td>
                    <td>{{talk[2]}}</td>
                    <td>{{talk[6]}}</td>
                    <td>{{talk[5]}}</td>
                </tr>
            </table>
        
        </div>
        <br>
    </div>
</template>

<script setup>
import { useTalkStore } from '../stores/talks'

const talk = useTalkStore()
//setInterval(function(){
    // console.log(talk.talks)
//},1000);

</script>

<style scoped>
    h2{
        text-align: center;
    }

    .eventDetails {
        width: 100%;
        display: flex;
        overflow-y:auto;
        max-height: 250px;
        justify-content: space-around;
    }

    table { 
        border-spacing: 10px; 
        margin-left: 2rem;
        margin-right: 2rem;
    }
    
    td{
        text-align: center;
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
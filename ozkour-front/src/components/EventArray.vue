<template>
  <h2 v-if="talk.retrieved == ''">Pas de talks entre les dates recherchées</h2>
  <div v-else>
    <h2>Liste des événements sélectionnés</h2>
    <div class="eventDetails">
      <table>
        <tr>
          <th scope="col"></th>
          <th scope="col">DATE</th>
          <th scope="col">UNIVERS</th>
          <th scope="col">TYPE</th>
          <th scope="col">NOM DE L'EVENEMENT</th>
          <th scope="col">TITRE DU TALK</th>
          <th scope="col">SPEAKER</th>
        </tr>
        <tr v-for="talk in talk.retrieved" v-bind:key="talk" data-test="talks">
          <td>
            <input
              type="checkbox"
              class="red-input"
              v-bind:value="talk"
              @change="check(talk, $event)"
              checked
            />
          </td>
          <td>{{ talk.date }}</td>
          <td>{{ talk.universe }}</td>
          <td>{{ talk.eventType }}</td>
          <td>{{ talk.eventName }}</td>
          <td>{{ talk.talkTitle }}</td>
          <td>{{ talk.speakers }}</td>
        </tr>
      </table>
    </div>
    <br />
  </div>
</template>

<script setup>
//import { ref } from 'vue'
import { useTalkStore } from "../stores/talks";

const talk = useTalkStore();


//console.log(talk)

function check(talkSelected, event) {
  const value = {
    date: talkSelected.date,
    universe: talkSelected.universe,
    eventType: talkSelected.eventType,
    eventName: talkSelected.eventName ,
    talkTitle: talkSelected.talkTitle,
    speakers: talkSelected.speakers,
    checked: talkSelected.checked,
  };

  if (event.target.checked) {
    //is selected
    talk.checkTalk(value);
  } else {
    //is not selected
    talk.uncheckTalk(value);
  }
}
//setInterval(function(){
// console.log(talk.talks)
//},1000);
</script>

<style scoped>
.red-input {
  accent-color: #bf1d67;
  height: 1.3em; /* not needed */
  width: 1.3em; /* not needed */
}
h2 {
  text-align: center;
}

.eventDetails {
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 250px;
  justify-content: space-around;
}

table {
  border-spacing: 10px;
  margin-left: 2rem;
  margin-right: 2rem;
}

td {
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

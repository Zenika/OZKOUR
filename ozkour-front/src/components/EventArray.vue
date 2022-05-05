<template>
  <h2 v-if="talk.retrived == ''">Pas de talks entre les dates recherchées</h2>
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
        <tr v-for="talk in talk.retrived" v-bind:key="talk" data-test="talks">
          <td>
            <input
              type="checkbox"
              class="red-input"
              v-bind:value="talk"
              v-model="checkedTalks"
              @change="check(talk, $event)"
              checked
            />
          </td>
          <td>{{ talk[4] }}</td>
          <td>{{ talk[3] }}</td>
          <td>{{ talk[1] }}</td>
          <td>{{ talk[2] }}</td>
          <td>{{ talk[6] }}</td>
          <td>{{ talk[5] }}</td>
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

const checkedTalks = talk.checkedTalks;

//console.log(talk)

function check(oui, event) {
  const value = {
    date: oui[4],
    universe: oui[3],
    eventType: oui[1],
    eventName: oui[2],
    talkTitle: oui[6],
    speakers: oui[5],
  };

  if (event.target.checked) {
    //is selected
    talk.addCheckedTalk(value);
  } else {
    //is not selected
    talk.removeCheckedTalk(value);
  }
  
  
  console.log(value);
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

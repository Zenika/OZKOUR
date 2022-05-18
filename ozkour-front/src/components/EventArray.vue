<template>
  <h2 v-if="talk.retrieved == ''">Pas de talks entre les dates recherchées</h2>
  <div v-else>
    <h2>Liste des événements sélectionnés</h2>
    <div class="eventDetails">
      <table>
        <tr>
          <th scope="col"></th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'date', selectable: true }"
            v-on:click="setSort('date')"
          >
            DATE
            <div
              class="arrow"
              v-if="sort === 'date'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'universe', selectable: true }"
            v-on:click="setSort('universe')"
          >
            UNIVERS
            <div
              class="arrow"
              v-if="sort === 'universe'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'eventType', selectable: true }"
            v-on:click="setSort('eventType')"
          >
            TYPE
            <div
              class="arrow"
              v-if="sort === 'eventType'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'eventName', selectable: true }"
            v-on:click="setSort('eventName')"
          >
            NOM DE L'EVENEMENT
            <div
              class="arrow"
              v-if="sort === 'eventName'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'talkTitle', selectable: true }"
            v-on:click="setSort('talkTitle')"
          >
            TITRE DU TALK
            <div
              class="arrow"
              v-if="sort === 'talkTitle'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
          <th
            scope="col"
            :class="{ columnSelected: sort === 'speakers', selectable: true }"
            v-on:click="setSort('speakers')"
          >
            SPEAKER
            <div
              class="arrow"
              v-if="sort === 'speakers'"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
        </tr>
        <tr v-for="talk in sortedTalk" v-bind:key="talk" data-test="talks">
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
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import { useTalkStore } from "../stores/talks";

const talk = useTalkStore();

const sort = ref("");
const ascending = ref(false);

function compare(a, b) {
  if (a[sort.value] < b[sort.value]) return -1;
  if (a[sort.value] > b[sort.value]) return 1;
  // a doit être égal à b
  return 0;
}

const sortedTalk = computed(() => {
  if (ascending.value) return talk.retrieved.sort((a, b) => compare(a, b));
  else return talk.retrieved.sort((a, b) => compare(b, a));
});

function setSort(column) {
  if (column === sort.value) ascending.value = !ascending.value;
  else {
    ascending.value = true;
    sort.value = column;
  }
}

//console.log(talk)

function check(talkSelected, event) {
  const value = {
    date: talkSelected.date,
    universe: talkSelected.universe,
    eventType: talkSelected.eventType,
    eventName: talkSelected.eventName,
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

.columnSelected {
  text-decoration: underline;
}

.selectable {
  cursor: pointer;
}

.arrow_down {
  background-image: url("../assets/images/arrow-down-1.png");
}

.arrow_up {
  background-image: url("../assets/images/arrow-up-2.png");
}

.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

.detail {
  font-weight: 600;
}
</style>

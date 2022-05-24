<template>
  <h2 v-if="talk.retrieved == ''">Pas de talks entre les dates recherchées</h2>
  <div v-else>
    <h2>Liste des événements sélectionnés</h2>
    <div class="eventDetails">
      <table>
        <tr>
          <th scope="col"></th>
          <th
            v-for="(columnsValue, index) in columnsValues"
            :key="index"
            scope="col"
            class="selectable"
            :class="{ columnSelected: sort === columnsValue.columnName }"
            @click="setSort(columnsValue.columnName)"
          >
            {{ columnsValue.displayColumns }}

             <IconArrow  v-if="sort === columnsValue.columnName"
              :class="ascending ? '' : 'arrow_down'"
              class="arrow"/>
          </th>
        </tr>
        <tr v-for="talk in sortedTalk" :key="talk" data-test="talks">
          <td>
            <input
              type="checkbox"
              class="red-input"
              :value="talk"
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

<script>
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import { useTalkStore } from "../stores/talks";

import IconArrow from '@/components/icons/IconArrow.vue';

export default {
  components : {
    IconArrow
  },

  setup() {
    const talk = useTalkStore();

    const sort = ref("");
    const ascending = ref(false);

    const columnsValues = [
      { columnName: "date", displayColumns: "DATE" },
      { columnName: "universe", displayColumns: "UNIVERS" },
      { columnName: "eventType", displayColumns: "TYPE" },
      { columnName: "eventName", displayColumns: "NOM DE L'EVENEMENT" },
      { columnName: "talkTitle", displayColumns: "TITRE DU TALK" },
      { columnName: "speakers", displayColumns: "SPEAKERS" },
    ];

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

    return {
      talk,
      sort,
      ascending,
      sortedTalk,
      setSort,
      check,
      columnsValues,
    };
  },
};

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
  transform: rotate(180deg);
}

.arrow {
  width: 12px;
  height: 15px;
  fill : white;
}

.detail {
  font-weight: 600;
}
</style>

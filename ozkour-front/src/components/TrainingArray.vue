<template>
  <div
    v-if="trainings.retreivingTrainings"
    class="loading-container"
  >
    <div class="loading">
      <div class="spinner">
        <div class="head" />
      </div>
    </div>
  </div>
  <h2 v-else-if="trainings.retrieved == '' && !trainings.retreivingTrainings">
    Pas de trainings entre les dates recherchées
  </h2>
  <div v-else>
    <h2>Liste des trainings sélectionnés</h2>
    <div class="event-details-container">
      <table>
        <tr>
          <th scope="col" />
          <th
            v-for="(columnsValue, index) in columnsValues"
            :key="index"
            scope="col"
            class="selectable"
            :class="{ columnSelected: sort === columnsValue.columnName }"
            :data-test="columnsValue.columnName"
            @click="setSort(columnsValue.columnName)"
          >
            {{ columnsValue.displayColumns }}

            <IconArrow
              v-if="sort === columnsValue.columnName"
              :class="ascending ? '' : 'arrow_down'"
              class="arrow"
            />
          </th>
        </tr>
        <tr
          v-for="training in sortedTraining"
          :key="training"
          data-test="trainings"
        >
          <td>
            <input
              type="checkbox"
              class="red-input"
              :value="training"
              checked
              @change="check(training, $event)"
            >
          </td>
          <td>{{ training.date }}</td>
          <td>{{ training.trainingTitle }}</td>
          <td>{{ training.universe }}</td>
          <td>{{ training.duration }}</td>
          <td>{{ training.price }}</td>
        </tr>
      </table>
    </div>
    <br>
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from '@vue/runtime-core'
import { useTrainingStore } from '../stores/trainings'

import IconArrow from '@/components/icons/IconArrow.vue'

export default {
  components: {
    IconArrow
  },

  setup () {
    const trainings = useTrainingStore()

    const sort = ref('')
    const ascending = ref(false)

    const columnsValues = [
      { columnName: 'date', displayColumns: 'DATE' },
      { columnName: 'trainingTitle', displayColumns: 'TITRE' },
      { columnName: 'universe', displayColumns: 'UNIVERS' },
      { columnName: 'duration', displayColumns: 'DURÉE' },
      { columnName: 'price', displayColumns: 'PRIX' }
    ]

    function compare (a, b) {
      if (a[sort.value] < b[sort.value]) return -1
      if (a[sort.value] > b[sort.value]) return 1
      // a must be equal to b
      return 0
    }

    const sortedTraining = computed(() => {
      if (ascending.value) return trainings.retrieved.sort((a, b) => compare(a, b))
      else return trainings.retrieved.sort((a, b) => compare(b, a))
    })

    function setSort (column) {
      if (column === sort.value) ascending.value = !ascending.value
      else {
        ascending.value = true
        sort.value = column
      }
    }

    function check (trainingSelected, event) {
      const value = {
        date: trainingSelected.date,
        universe: trainingSelected.universe,
        eventType: trainingSelected.eventType,
        eventName: trainingSelected.eventName,
        trainingTitle: trainingSelected.trainingTitle,
        speakers: trainingSelected.speakers,
        checked: trainingSelected.checked
      }

      if (event.target.checked) {
        // is selected
        trainings.checkTraining(value)
      } else {
        // is not selected
        trainings.uncheckTraining(value)
      }
    }

    return {
      trainings,
      sort,
      ascending,
      sortedTraining,
      setSort,
      check,
      columnsValues
    }
  }
}
</script>

<style lang="scss" scoped>

  .red-input {
    @include checkbox;
  }

  h2 {
    text-align: center;
  }

  .event-details-container {
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
    @include arrow;
  }

  .loading-container {
    display:grid;
    justify-content:center;
    margin:1.5em;
    left:48.5%;
    top:50%;
  }

  .loading {
    border-radius:50%;
    width:3em;
    height:3em;
    transform-origin:center;
    animation: rotate 1s linear infinite;
  }

  .spinner {
    width: 4em;
    height: 4em;
    left: -1.1em;
    top: -1.1em;

    border-top: 1em solid #ffffffac;
    position:relative;
    border-right: 1em solid transparent;
    border-radius: 50%;
  }

  .head {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-left: 3.45em;
    margin-top: -0.37em;
    background-color: #ffffffff;
  }

  @keyframes rotate{
    to{
      transform:rotate(360deg);
    }
  }
</style>

<script>
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import ChoosingDate from '@/components/ChoosingDate.vue'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import EventArray from '@/components/EventArray.vue'
import RecapModal from '@/components/RecapModal.vue'
import { useTrainingStore } from '@/stores/trainings'
import PopUp from '../components/PopUp.vue'

const eventsTemplate = {
  EMAILING: {
    id: 'emailing',
    label: 'E-MAILING',
    value: 'E-mailing',
    frequency: 'month',
    validated: true
  },
  SLIDE:
  {
    id: 'slide',
    label: 'SLIDE',
    value: 'Slide',
    frequency: 'month',
    validated: false
  }
}

const columnsValues = [
  { key: 'date', label: 'DATE' },
  { key: 'trainingTitle', label: 'TITRE' },
  { key: 'universe', label: 'UNIVERS' },
  { key: 'duration', label: 'DURÉE' },
  { key: 'price', label: 'PRIX' }
]

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    PrimaryBtn,
    EventArray,
    RecapModal,
    PopUp
  },
  data () {
    return {
      chosenTemplate: eventsTemplate.EMAILING,
      replyMessage: '',
      period: { start: '', end: '' },
      isPopUpVisible: false,
      visuals: Object.values(eventsTemplate),
      isModalVisible: false,
      columnsValues,
      isVisualGenerationFailed: false,
      isGetTrainigsFailed: false,
      trainings: useTrainingStore()
    }
  },
  computed: {
    isSelectionEmpty () {
      return this.trainings.getSelectedTrainings.length === 0
    }
  },
  methods: {
    async onRecapSubmit () {
      try {
        const { link, message } = await this.trainings.generateVisualForSelectedTrainings(this.chosenTemplate.value)
        if (link) {
          window.open(link, '_blank')
        }
        this.replyMessage = message
      } catch (e) {
        this.isVisualGenerationFailed = true
      } finally {
        this.closeModal()
        this.showPopUp()
      }
    },
    async handleSearchTraining ({ dateStart, dateEnd }) {
      this.period = { start: dateStart, end: dateEnd }
      try {
        await this.trainings.getTrainings(dateStart, dateEnd)
      } catch (e) {
        this.isGetTrainingsFailed = true
      }
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    showPopUp () {
      this.isPopUpVisible = true
    },
    closePopUp () {
      this.replyMessage = ''
      this.isPopUpVisible = false
      this.isVisualGenerationFailed = false
    },
    changeTemplate (newTemplate) {
      this.chosenTemplate = newTemplate
    },
    sort (sortData) {
      this.trainings.sort(sortData)
    },
    changeSelectionTraining (changedSelectionTraining) {
      this.trainings.changeSelectionTraining(changedSelectionTraining)
    }
  }
}
</script>

<template>
  <main
    :class="{ 'container--blured': isModalVisible || isPopUpVisible}"
    class="container"
  >
    <h1 class="container__title">
      Visuels pour les Trainings
    </h1>

    <section class="container__section">
      <ChoosingTemplate
        :visuals="visuals"
        :selected="chosenTemplate"
        @change-template="changeTemplate"
      />
      <ChoosingDate
        :chosen-template="chosenTemplate"
        @on-search-event="handleSearchTraining"
      />
    </section>

    <section class="container__eventList">
      <EventArray
        :events="trainings.retrieved"
        :retrieving="trainings.retreivingTrainings"
        :columns="columnsValues"
        @new-sort="sort"
        @new-selection-change="changeSelectionTraining"
      >
        trainings
      </EventArray>
    </section>

    <PrimaryBtn
      class="container__section container__lastSection"
      :disabled="isSelectionEmpty"
      @click="showModal"
    >
      Générer un visuel
    </PrimaryBtn>

    <PopUp
      v-if="isPopUpVisible"
      id="training-popup-modal"
      :class="'non-blurable'"
      :error="isVisualGenerationFailed"
      :title="(isVisualGenerationFailed?'Erreur'
        :'Résultat')"
      @close="closePopUp"
    >
      <p v-if="isVisualGenerationFailed">
        Désolée, une erreur est survenue ! <br> Le visuel n'a pas pu être généré :(
      </p>
      <p v-else>
        {{ replyMessage }}
      </p>
    </PopUp>
    <RecapModal
      v-if="isModalVisible"
      id="trainings-recap-modal"
      class="non-blurable"
      :events-title="trainings.getSelectedTrainingsTitle"
      :template="chosenTemplate.label"
      :dates="period"
      @submit="onRecapSubmit"
      @close="closeModal"
    >
      Liste des trainings :
    </RecapModal>
  </main>
</template>

<style lang="scss" scoped>

.container {
  @include form-container;

  &--blured > :not(.non-blurable) {
    filter: blur(5px);
  }

  &__section {
    @include section;
  }

  &__eventList {
    @include events-list;
  }

  &__lastSection {
    margin-bottom: 50px;
    width: auto;
  }

  &__title {
    @include title-1;
    font-size: 48px;
  }
}
</style>

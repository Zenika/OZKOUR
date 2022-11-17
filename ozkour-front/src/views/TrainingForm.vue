<script>
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import ChoosingDate from '@/components/ChoosingDate.vue'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import EventArray from '@/components/TrainingArray.vue'
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
      isPopUpVisible: false,
      visuals: Object.values(eventsTemplate),
      isModalVisible: false,
      isVisualGenerationFailed: false,
      isGetTrainigsFailed: false,
      trainings: useTrainingStore()
    }
  },
  methods: {
    async onRecapSubmit () {
      try {
        const link = await this.trainings.generateVisualForSelectedTrainings()
        window.open(link, '_blank')
      } catch (e) {
        this.isVisualGenerationFailed = true
      }

      this.closeModal()
    },
    async handleSearchTraining ({ dateStart, dateEnd }) {
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
    },
    closeErrorMessage () {
      this.isVisualGenerationFailed = false
    },
    changeTemplate (newTemplate) {
      this.chosenTemplate = newTemplate
    }
  }
}
</script>

<template>
  <main
    :class="{ 'container--blured': isModalVisible }"
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
      <EventArray />
    </section>

    <PrimaryBtn
      class="container__section container__lastSection"
      @click="showModal"
    >
      Générer un visuel
    </PrimaryBtn>

    <div
      v-if="isVisualGenerationFailed"
      class="errorMsg"
    >
      <img
        src="../assets/images/danger.png"
        alt="error"
        class="error-img"
      >
      <p>Désolée, une erreur est survenue ! <br> Le visuel n'a pas pu être généré :(</p>
      <PrimaryBtn
        @click="closeErrorMessage"
      >
        X
      </PrimaryBtn>
    </div>

    <RecapModal
      v-if="isModalVisible"
      id="trainings-recap-modal"
      class="non-blurable"
      :events="trainings.getSelectedTrainings"
      :template="chosenTemplate.name"
      :dates="trainings.date"
      :is-event-type-training="true"
      @submit="onRecapSubmit"
      @close="closeModal"
    />
    <PopUp
      v-if="isPopUpVisible"
      id="trainings-popup-modal"
      class="non-blurable"
      :message="replyMessage"
      :title="'Résultat'"
      @close="closePopUp"
    />
  </main>
</template>

<style lang="scss" scoped>

.container {
  @include form-container;

  &--blured > :not(#trainings-recap-modal) {
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
.errorMsg{
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(242, 242, 242, 1);
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
  z-index: 10;
}

.error-img{
  width: 30%;
}
</style>

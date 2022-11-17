<script>
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import ChoosingDate from '@/components/ChoosingDate.vue'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import EventArray from '@/components/TalksArray.vue'
import RecapModal from '@/components/RecapModal.vue'
import { useTalkStore } from '@/stores/talks'
import PopUp from '../components/PopUp.vue'

const eventsTemplate = {
  QUOI_DE_9: {
    id: 'quoide9',
    label: 'QUOI DE 9',
    value: 'QuoiDeNeuf',
    frequency: 'week',
    validated: true
  },
  EMAILING: {
    id: 'emailing',
    label: 'E-MAILING',
    value: 'E-mailing',
    frequency: 'month',
    validated: true
  },
  MEETUP: {
    id: 'meetup',
    label: 'MEET-UP',
    value: 'Meet-up',
    frequency: 'month',
    validated: false
  },
  SLACK: {
    id: 'slack',
    label: 'SLACK',
    value: 'Slack',
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
      chosenTemplate: eventsTemplate.QUOI_DE_9,
      replyMessage: '',
      isPopUpVisible: false,
      visuals: Object.values(eventsTemplate),
      isModalVisible: false,
      isVisualGenerationFailed: false,
      isGetTalksFailed: false,
      talks: useTalkStore()
    }
  },
  methods: {
    async onRecapSubmit () {
      try {
        const { link, message } = await this.talks.generateVisualForSelectedTalks()
        window.open(link, '_blank')
        this.replyMessage = message
        this.showPopUp()
      } catch (e) {
        this.isVisualGenerationFailed = true
      }

      this.closeModal()
    },
    async handleSearchTalk ({ dateStart, dateEnd }) {
      try {
        await this.talks.getTalks(dateStart, dateEnd)
      } catch (e) {
        this.isGetTalksFailed = true
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
    :class="{ 'container--blured': isModalVisible || isPopUpVisible}"
    class="container"
  >
    <h1 class="container__title">
      Visuels pour les Talks
    </h1>

    <section class="container__section">
      <ChoosingTemplate
        :visuals="visuals"
        :selected="chosenTemplate"
        @change-template="changeTemplate"
      />
      <ChoosingDate
        :chosen-template="chosenTemplate"
        @on-search-event="handleSearchTalk"
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
      id="talk-recap-modal"
      class="non-blurable"
      :events="talks.getSelectedTalks"
      :template="chosenTemplate.name"
      :dates="talks.date"
      :is-event-type-talk="true"
      @submit="onRecapSubmit"
      @close="closeModal"
    />
    <PopUp
      v-if="isPopUpVisible"
      id="talk-popup-modal"
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

<script>
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import ChoosingDate from '@/components/ChoosingDate.vue'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import RecapModal from '@/components/RecapModal.vue'
import { useTalkStore } from '@/stores/talks'
import PopUp from '../components/PopUp.vue'
import EventArray from '@/components/EventArray.vue'
import EventWarningArray from '@/components/EventWarningArray.vue'

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

const columnsValues = [
  { key: 'date', label: 'DATE' },
  { key: 'universe', label: 'UNIVERS' },
  { key: 'eventType', label: 'TYPE' },
  { key: 'eventName', label: "NOM DE L'EVENEMENT" },
  { key: 'talkTitle', label: 'TITRE DU TALK' },
  { key: 'speakers', label: 'SPEAKERS' }
]

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    PrimaryBtn,
    RecapModal,
    PopUp,
    EventArray,
    EventWarningArray
  },
  data () {
    return {
      chosenTemplate: eventsTemplate.QUOI_DE_9,
      replyMessage: '',
      period: { start: '', end: '' },
      isPopUpVisible: false,
      visuals: Object.values(eventsTemplate),
      isModalVisible: false,
      isVisualGenerationFailed: false,
      isGetTalksFailed: false,
      talks: useTalkStore(),
      columnsValues
    }
  },
  methods: {
    async onRecapSubmit () {
      try {
        const { link, message } = await this.talks.generateVisualForSelectedTalks(this.chosenTemplate.value)
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
    async handleSearchTalk ({ dateStart, dateEnd }) {
      this.period = { start: dateStart, end: dateEnd }
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
      this.isVisualGenerationFailed = false
    },
    changeTemplate (newTemplate) {
      this.chosenTemplate = newTemplate
    },
    sort (sortData) {
      this.talks.sort(sortData)
    },
    changeSelectionTalk (changedSelectionTalk) {
      this.talks.changeSelectionTalk(changedSelectionTalk)
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
    <section class="container__warning">
      <EventWarningArray
        v-if="talks?.warning?.length"
        :warning="talks.warning"
      />
    </section>

    <section class="container__eventList">
      <EventArray
        :events="talks.retrieved"
        :retrieving="talks.retreivingTalks"
        :columns="columnsValues"
        @new-sort="sort"
        @new-selection-change="changeSelectionTalk"
      >
        talks
      </EventArray>
    </section>

    <PrimaryBtn
      class="container__section container__lastSection"
      @click="showModal"
    >
      Générer un visuel
    </PrimaryBtn>

    <PopUp
      v-if="isPopUpVisible"
      id="talk-popup-modal"
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
      id="talk-recap-modal"
      class="non-blurable"
      :events-title="talks.getSelectedTalksTitle"
      :template="chosenTemplate.label"
      :dates="period"
      @submit="onRecapSubmit"
      @close="closeModal"
    >
      Liste des talks :
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

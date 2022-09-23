<script>
import ChoosingTemplate from '@/components/ChoosingTemplate.vue'
import ChoosingDate from '@/components/ChoosingDate.vue'
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import EventArray from '@/components/EventArray.vue'
import RecapModal from '@/components/RecapModal.vue'
import { useTalkStore } from '@/stores/talks'

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    PrimaryBtn,
    EventArray,
    RecapModal
  },
  data () {
    return {
      isModalVisible: false,
      isSlidesGenerationFailed: false,
      isGetTalksFailed: false,
      talks: useTalkStore()
    }
  },
  methods: {
    async onRecapSubmit () {
      try {
        const link = await this.talks.generateSlidesForSelectedTalks()
        window.open(link, '_blank')
      } catch (e) {
        this.isSlidesGenerationFailed = true
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
    closeErrorMessage () {
      this.isSlidesGenerationFailed = false
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
      Visuels pour les Talks
    </h1>

    <section class="container__section">
      <ChoosingTemplate />
      <ChoosingDate @on-search-talk="handleSearchTalk" />
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
      v-if="isSlidesGenerationFailed"
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
      :talks="talks.getSelectedTalks"
      :template="talks.template.name"
      :dates="talks.date"
      @submit="onRecapSubmit"
      @close="closeModal"
    />
  </main>
</template>

<style lang="scss" scoped>

.container {
  @include form-container;

  &--blured > :not(#talk-recap-modal) {
    filter: blur(5px);
  }

  &__section {
    @include section;
  }

  &__eventList {
    @include talks-list;
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

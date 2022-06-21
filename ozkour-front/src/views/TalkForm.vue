<script>
import ChoosingTemplate from "@/components/ChoosingTemplate.vue";
import ChoosingDate from "@/components/ChoosingDate.vue";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import EventArray from "@/components/EventArray.vue";
import RecapModal from '@/components/RecapModal.vue';
import { useTalkStore } from "@/stores/talks";

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
      isSlidesGenerationFailed : false,
      isGetTalksFailed : false,
      talks : useTalkStore()
    };
  },
  methods: {
    async onRecapSubmit() {
      try {
        const link = await this.talks.generateSlidesForSelectedTalks();

        window.open(link, "_blank");
      } catch (e) {
        this.isSlidesGenerationFailed = true;
      }

      this.closeModal();
    },
    async handleSearchTalk({dateStart, dateEnd}) {
      try {
        await this.talks.getTalks(dateStart, dateEnd)
      } catch (e) {
        this.isGetTalksFailed = true;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
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

    <span v-if="isSlidesGenerationFailed">Sorry, c'est pas OK</span>

    <RecapModal
      v-if="isModalVisible"
      id="talk-recap-modal"
      :talks="talks.getSelectedTalks"
      :template="talks.template.template"
      :dates="talks.date"
      @submit="onRecapSubmit"
      @close="closeModal"
    />
  </main>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  &--blured > :not(#talk-recap-modal) {
    filter: blur(5px);
  }

  &__section {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  &__eventList {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(242, 242, 242, 0.4);
    border-radius: 20px;
  }

  &__lastSection {
    margin-bottom: 50px;
    width: auto;
  }

  &__title {
    font-family: "Nunito", sans-serif;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
  }
}
</style>

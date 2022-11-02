<script>
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'
import { ref } from 'vue'

export default {
  components: {
    PrimaryBtn
  },
  props: {
    talks: {
      type: Array,
      required: true
    },
    dates: {
      type: Object,
      required: true
    },
    template: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'submit'],
  setup () {
    const loading = ref(false)
    function load () {
      loading.value = !loading.value
    }
    return {
      loading,
      load
    }
  },
  expose: ['reset']
}
</script>

<template>
  <div class="popup-bg">
    <div class="popup-header">
      <button
        type="button"
        class="close-btn"
        @click="$emit('close')"
      >
        X
      </button>
      <h2>Récapitulatif</h2>
    </div>

    <div class="recap">
      <div class="recap-details">
        <div class="icon-bg">
          <img
            src="../assets/images/gallery.png"
            alt="calendar"
            class="icon"
          >
        </div>
        <p data-test="template-detail">
          <b>Visuel : </b>{{ template }}
        </p>
      </div>
      <div class="recap-details">
        <div class="icon-bg">
          <img
            src="../assets/images/calendar.png"
            alt="calendar"
            class="icon"
          >
        </div>
        <p data-test="date-detail">
          <b>Dates : </b>{{ dates.start }} au {{ dates.end }}
        </p>
      </div>
      <div>
        <div class="recap-details">
          <div class="icon-bg">
            <img
              src="../assets/images/microphone.png"
              alt="calendar"
              class="icon"
            >
          </div>
          <p><b>Liste des talks : </b></p>
        </div>
        <ul class="events">
          <li
            v-for="talk in talks"
            :key="talk"
            data-test="talk-title"
          >
            {{ talk.talkTitle?talk.talkTitle:"non renseigné" }}
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="loading"
      class="loading-container"
    >
      <div class="loading">
        <div class="spinner">
          <div class="head" />
        </div>
      </div>
    </div>

    <div class="validate">
      <PrimaryBtn
        :disabled="loading"
        @click="load(), $emit('submit')"
      >
        Valider
      </PrimaryBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.popup-bg {
  @include popup-bg;
}

.popup-header {
  @include popup-header;
}

.close-btn {
  @include body;
  @include popup-close-button;
}

.recap {
  color: black;
  padding: 0px 20px;
}

.icon-bg {
  @include popup-icon-bg;
}

.icon {
  width: 20px;
}

.recap-details {
  @include popup-summary;
}

.events {
  margin: 0px;
  padding-left: 60px;
}

.validate {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}
</style>

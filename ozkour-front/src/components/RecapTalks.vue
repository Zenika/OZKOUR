<script>
export default {
  props: {
    talks: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
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
</template>

<style lang="scss" scoped>

.popup-bg {
  @include popup-bg;
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
</style>

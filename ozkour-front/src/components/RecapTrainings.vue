<script>
export default {
  props: {
    trainings: {
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
    <p><b>Liste des trainings : </b></p>
  </div>
  <ul class="events">
    <li
      v-for="training in trainings"
      :key="training"
    >
      {{ training.trainingTitle?training.trainingTitle:"non renseigné" }}
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

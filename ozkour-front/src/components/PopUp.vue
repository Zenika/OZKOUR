<script>
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'

export default {
  components: {
    PrimaryBtn
  },
  props: {
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
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
      <h2>{{ title }}</h2>
    </div>

    <div class="recap">
      <div class="recap-details" />
      <p class="text-pop-up">
        {{ message }}
      </p>
    </div>
    <div class="validate">
      <PrimaryBtn
        @click="$emit('close')"
      >
        OK
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

.text-pop-up {
  text-align: center;
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

.loading-container {
  display:grid;
  justify-content:center;
  position:fixed;
  left:48.5%;
  top:50%;
}

.loading {
  border-radius:50%;
  width:2.5em;
  height:2.5em;
  transform-origin:center;
  animation: rotate 1s linear infinite;
}

.spinner {
  width: 7em;
  height: 7em;
  left: -2.8em;
  top: -2.8em;
  border-top: 1em solid #C21E65;
  position:relative;
  border-right: 1em solid transparent;
  border-radius: 50%;
}

.head {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-left: 5.9em;
  margin-top: -0.05em;
  background: linear-gradient(-25deg, #EE2238 0%, #C21E65 100%);
}

@keyframes rotate{
  to{
    transform:rotate(360deg);
  }
}
</style>

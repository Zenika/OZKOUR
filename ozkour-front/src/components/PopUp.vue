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

    <div class="message">
      <div class="message-details" />
      <p class="message-pop-up">
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

.recap-details {
  @include popup-summary;
}

.text-pop-up {
  text-align: center;
}

.validate {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}

</style>

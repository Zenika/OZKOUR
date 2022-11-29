<script>
import PrimaryBtn from '@/components/Buttons/PrimaryBtn.vue'

export default {
  components: {
    PrimaryBtn
  },
  props: {
    error: {
      type: Boolean,
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
      <img
        v-if="error"
        src="../assets/images/danger.png"
        alt="error"
        class="error-img"
      >
      <p class="message-pop-up">
        <slot />
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

.error-img{
  width: 30%;
}

.message{
  text-align: center;
}
.message-pop-up{
  color:black;
}

.validate {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}

</style>

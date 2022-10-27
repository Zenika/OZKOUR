<script setup>
const { watch, ref } = require('@vue/runtime-core')

const props = defineProps({
  visuals: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['changeTemplate'])
const selected = ref('')

emit('changeTemplate', 0)

watch(selected, async (newSelect) => {
  let n = 0
  while (props.visuals[n].value !== newSelect) {
    n++
  }
  emit('changeTemplate', n)
})

</script>

<template>
  <div action="#">
    <fieldset class="template-container">
      <legend>Choisir un visuel</legend>
      <div class="templateChoice">
        <div
          v-for="visual in visuals"
          :key="visual"
        >
          <input
            :id="visual.id"
            v-model="selected"
            type="radio"
            name="template"
            :value="visual.value"
            :checked="visual.id == 'quoide9'"
            :disabled="visual.validated ? false : true"
            class="radio-btn"
          >
          <label :for="visual.id">{{ visual.label }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>

  .template-container {
    border: none;
  }
  legend {
    @include legend-template-choices;
  }
  .templateChoice {
    @include body;
    @include template-chosen;
  }
  .radio-btn {
    @include checkbox;
  }
  .blurClass {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
</style>

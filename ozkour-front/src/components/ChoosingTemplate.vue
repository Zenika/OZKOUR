<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  visuals: {
    type: Array,
    required: true
  },
  selected: {
    type: Object,
    required: true
  }
})
const selectedId = ref(props.selected.id)
const emit = defineEmits(['changeTemplate'])

watch(selectedId, (newSelectedId) => {
  const newSelected = props.visuals.find(visual => visual.id === newSelectedId)
  emit('changeTemplate', newSelected)
}
)

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
            v-model="selectedId"
            type="radio"
            name="template"
            :value="visual.id"
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

<script setup>
const { useTalkStore } = require('@/stores/talks')
const { watch, ref } = require('@vue/runtime-core')

const talk = useTalkStore()

const selected = ref('')

const visuals = [
  {
    id: 'quoide9',
    label: 'QUOI DE 9',
    value: 'QuoiDeNeuf',
    frequency: 'week',
    validated: true
  },
  {
    id: 'emailing',
    label: 'E-MAILING',
    value: 'E-mailing',
    frequency: 'month',
    validated: true
  },
  {
    id: 'meetup',
    label: 'MEET-UP',
    value: 'Meet-up',
    frequency: 'month',
    validated: false
  },
  {
    id: 'slack',
    label: 'SLACK',
    value: 'Slack',
    frequency: 'month',
    validated: false
  }
]

talk.pickedTemplate(visuals[0].value, visuals[0].frequency, visuals[0].validated)

watch(selected, async (newSelect) => {
  let n = 0
  while (visuals[n].value !== newSelect) {
    n++
  }
  talk.pickedTemplate(newSelect, visuals[n].frequency)
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

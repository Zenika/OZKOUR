<script setup>
import DateInput from './DateInput.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  period: {
    required: true,
    type: Array
  }
})

const tempPeriod = ref(props.period)

const emits = defineEmits(['change'])

watch(() => props.period, (newValue) => {
  tempPeriod.value = newValue
})

function onStartDateChange (date) {
  if (date > tempPeriod.value[1]) {
    tempPeriod.value[1] = date
  }
  tempPeriod.value[0] = date
  emits('change', tempPeriod)
}

function onEndDateChange (date) {
  if (date < tempPeriod.value[0]) {
    tempPeriod.value[0] = date
  }
  tempPeriod.value[1] = date
  emits('change', tempPeriod)
}

</script>
<template>
  <div class="flex-column">
    <DateInput
      :date="tempPeriod[0]"
      @change="onStartDateChange"
    >
      Date de début
    </DateInput>

    <DateInput
      :date="tempPeriod[1]"
      @change="onEndDateChange"
    >
      Date de fin
    </DateInput>
  </div>
</template>

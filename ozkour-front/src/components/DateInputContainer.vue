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

function onStartDateChange (newStartDate) {
  const newStartDateIsAfterEndDate = newStartDate > tempPeriod.value[1]
  if (newStartDateIsAfterEndDate) {
    tempPeriod.value[1] = newStartDate
  }
  tempPeriod.value[0] = newStartDate
  emits('change', tempPeriod)
}

function onEndDateChange (newEndDate) {
  const newEndDateIsBeforeStartDate = newEndDate < tempPeriod.value[0]
  if (newEndDateIsBeforeStartDate) {
    tempPeriod.value[0] = newEndDate
  }
  tempPeriod.value[1] = newEndDate
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

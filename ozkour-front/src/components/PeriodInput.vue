<script setup>
import DateInput from './DateInput.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  period: {
    required: true,
    type: Array
  }
})

const tempPeriod = ref(makePeriodValid(props.period))

const emits = defineEmits(['change'])

watch(() => props.period, (newValue) => {
  tempPeriod.value = makePeriodValid(newValue)
})

function makePeriodValid (period) {
  const startDateIsBeforeEndDate = period[0] < period[1]
  const validPeriod = period
  if (startDateIsBeforeEndDate) {
    return validPeriod
  } else {
    validPeriod[0] = period[1]
    validPeriod[1] = period[0]
    return validPeriod
  }
}

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

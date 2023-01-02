<script setup>
import { DateTime } from 'luxon'
import { ref, watch } from 'vue'
const props = defineProps({
  date: {
    required: true,
    type: Date
  }
})

const emits = defineEmits(['change'])
const formatedDate = ref(DateTime.fromJSDate(props.date).toFormat('yyyy-MM-dd'))

watch(() => props.date, (newValue) => {
  formatedDate.value = DateTime.fromJSDate(newValue).toFormat('yyyy-MM-dd')
})
watch(formatedDate, (newValue) => {
  const parsedDate = DateTime.fromISO(newValue)
  if (parsedDate.isValid) {
    emits('change', parsedDate.toJSDate())
  }
})
</script>
<template>
  <div class="date">
    <label><slot /></label>
    <input
      v-model="formatedDate"
      type="date"
    >
  </div>
</template>
<style lang="scss" scoped>

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  @include body;
  @include label;
}

input {
  @include body;
  @include input;
}
</style>

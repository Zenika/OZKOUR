<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted } from 'vue'

const dateRange = ref()

onMounted(() => {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  dateRange.value = [firstDayOfMonth, lastDayOfMonth]
})
</script>

<template>
  <VueDatePicker
    v-model="dateRange"
    range
    auto-apply
    :month-change-on-scroll="false"
    :enable-time-picker="false"
    locale="fr"
    format="dd/MM/yyyy"
    hide-offset-dates
    dark
  />
</template>

<style lang="scss">
:root {
  --dp-font-family: "Open Sans", sans-serif;
  --dp-border-radius: 0.5rem;
  --dp-cell-border-radius: 0.5rem;
}

.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #df2147;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>

<template>
  <EventArrayLoader
    v-if="retrieving"
  />
  <EventArrayEmpty
    v-else-if="isEventsEmpty()"
  >
    <slot />
  </EventArrayEmpty>
  <EventArrayContent
    v-else
    :events="events"
    :columns="columns"
    @new-sort="newSort"
    @new-selection-change="onSelectionEvent"
  >
    <slot />
  </EventArrayContent>
</template>
<script setup>
import EventArrayLoader from '@/components/EventArrayLoader.vue'
import EventArrayContent from '@/components/EventArrayContent.vue'
import EventArrayEmpty from './EventArrayEmpty.vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  retrieving: {
    type: Boolean,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['newSort', 'newSelectionChange'])

function newSort (sortData) {
  emits('newSort', sortData)
}

function onSelectionEvent (eventSelectionChanged) {
  emits('newSelectionChange', eventSelectionChanged)
}

function isEventsEmpty () {
  return props.events && props.events.length < 1
}
</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
  }
</style>

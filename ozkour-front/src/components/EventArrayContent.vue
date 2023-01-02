<template>
  <h2>Liste des <slot /> sélectionnés</h2>
  <div
    class="
    event-details-container"
  >
    <table>
      <thead>
        <EventHeader
          :columns="columns"
          @sort="onSort"
        />
      </thead>
      <tbody>
        <EventLine
          v-for="currentEvent in events"
          :key="currentEvent"
          :value="currentEvent"
          :columns="columns"
          @change="onSelectionEvent"
        />
      </tbody>
    </table>
  </div>
  <br>
</template>

<script setup>

import EventLine from '@/components/EventLine.vue'
import EventHeader from '@/components/EventHeader.vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['newSort', 'newSelectionChange'])

function onSort (sortDataHeader) {
  const { selectedColumnKey, orderIsAscending } = sortDataHeader
  const sortData = { selectedColumnKey, orderIsAscending, events: props.events }
  emits('newSort', sortData)
}

function onSelectionEvent (eventSelectionChanged) {
  emits('newSelectionChange', eventSelectionChanged)
}

</script>

<style lang="scss">
  table {
    border-spacing: 10px;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .event-details-container {
    width: auto;
    display: flex;
    overflow-y: auto;
    max-height: 250px;
    justify-content: space-around;
  }
</style>

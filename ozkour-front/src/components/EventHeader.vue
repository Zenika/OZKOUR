<template>
  <tr>
    <th scope="col" />
    <th
      v-for="column in columns"
      :key="column.key"
      scope="col"
      class="selectable"
      :class="{ columnSelected: selectedColumnKey === column.key }"
      @click="onColumnClick(column.key)"
    >
      {{ column.label }}
      <IconArrow
        v-if=" selectedColumnKey=== column.key"
        :class="{ 'arrow_down' : isAscending}"
      />
    </th>
  </tr>
</template>

<script setup>
import { ref } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
})
const emits = defineEmits(['sort'])
const isAscending = ref(false)
const selectedColumnKey = ref(props.columns[0].key)

onColumnClick(selectedColumnKey.value)

function onColumnClick (columnKey) {
  if (columnKey === selectedColumnKey.value) {
    isAscending.value = !isAscending.value
  } else {
    selectedColumnKey.value = columnKey
    isAscending.value = true
  }
  const sortDataHeader = { selectedColumnKey: selectedColumnKey.value, orderIsAscending: isAscending.value }
  emits('sort', sortDataHeader)
}

</script>
<style lang="scss">
  .arrow_down {
    transform: rotate(180deg);
  }
  .selectable {
    cursor: pointer;
  }
  .columnSelected {
    text-decoration: underline;
  }
</style>

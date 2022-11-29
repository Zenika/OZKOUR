<template>
  <tr>
    <td>
      <input
        type="checkbox"
        class="red-input"
        :checked="value.checked"
        @click="onChangeSelectedEvent"
      >
    </td>
    <td
      v-for="column in columns"
      :key="column.key"
    >
      {{ value[column.key] }}
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['change'])

function onChangeSelectedEvent () {
  emits('change', props.value)
}

</script>

<style lang="scss">
 .red-input {
    @include checkbox;
  }
  td {
    text-align: center;
  }
</style>

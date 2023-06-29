<script setup>
const props = defineProps({
  retrievingWarning: {
    type: Array,
    required: true
  }
})

const Warning = (array) => {
  let warning = ''
  for (let i = 0; i <= array.length - 1; i++) {
    if (i !== array.length - 1) warning += array[i] + ','
    if (i === array.length - 1) warning += ' ' + array[i]
  }
  return ' WARNING : Données manquantes sur les lignes excel suivantes : ' + warning + '.'
}

</script>

<template>
  <p>
    {{ Warning(props.retrievingWarning) }}
  </p>
</template>

<style  lang="scss" scoped>
p {
color: $warning;
font-size: 20px;
}
</style>

<script setup>
const props = defineProps({
  warning: {
    type: Array,
    required: true
  }
})
const warning = (array) => {
  let conjugation = ''
  const indexGoogleSheet = array.map((el, index) => {
    if (index !== array.length - 1) {
      return el + ','
    } else {
      return ' ' + el
    }
  }).join('')

  if (array.length > 1) {
    conjugation = 'les lignes'
  } else {
    conjugation = 'la ligne'
  }

  return ' WARNING : Données manquantes sur ' + conjugation + ' du google sheet : ' + indexGoogleSheet + '.'
}

</script>

<template>
  <p>
    {{ warning(props.warning) }}
  </p>
</template>

<style  lang="scss" scoped>
p {
color: $warning;
font-size: 20px;
}
</style>

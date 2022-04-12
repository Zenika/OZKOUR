<script>

import ChoosingTemplate from '../components/ChoosingTemplate.vue';
import ChoosingDate from '../components/ChoosingDate.vue';
import ValidateButton from '../components/ValidateBtn.vue'
import GenerateButton from '../components/GenerateBtn.vue'

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    ValidateButton,
    GenerateButton
  },
}
</script>

<template>
    <main class="flex-column">
        <h1>VISUELS TALK</h1>

        <section class="section">
            <ChoosingTemplate />
            <ChoosingDate />
            
        </section>

        <section class="section">
            <h2>Liste des événements sélectionnés</h2>
        </section>

        <section class="section">
            <ValidateButton />
            <GenerateButton />
        </section>
        
    </main> 
</template>

<style scoped>
.section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

h1 {
    font-family: 'Nunito', sans-serif;
    text-align: center;
}
</style>
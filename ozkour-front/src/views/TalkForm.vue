<script>
import ChoosingTemplate from '../components/ChoosingTemplate.vue';
import ChoosingDate from '../components/ChoosingDate.vue'

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate
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

        <section class="">
            <h2>Liste des événements sélectionnés</h2>
        </section>

        <section class="">
            <button>VALIDER</button>
            <button>GENERER UN VISUEL</button>
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

</style>
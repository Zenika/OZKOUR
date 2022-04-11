<script>
import ChoosingTemplate from '../components/ChoosingTemplate.vue'

export default {
  components: {
    ChoosingTemplate
  },
}

</script>


<template>
    <main class="sections">
        <h1>VISUELS TALK</h1>

        <section class="section">
            <ChoosingTemplate />
        </section>
        
        <section class="section">
            <h2>Liste des événements sélectionnés</h2>
        </section>

        <section class="section">
            <button>VALIDER</button>
            <button>GENERER UN VISUEL</button>
        </section>
        
    </main> 
</template>

<style scoped>
.sections {
    display: flex;
    flex-direction: column;
}
</style>
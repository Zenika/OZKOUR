<script>
import ChoosingTemplate from '../components/ChoosingTemplate.vue';
import ChoosingDate from '../components/ChoosingDate.vue';
import ValidateButton from '../components/Buttons/ValidateBtn.vue';
import GenerateButton from '../components/Buttons/GenerateBtn.vue';
import EventArray from '../components/EventArray.vue';
// import EventList from '../components/EventList.vue';
// import DatPicker2 from '../components/DatePicker2.vue'

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    ValidateButton,
    GenerateButton,
    // EventList,
    // DatPicker2,
    EventArray
  },
}
</script>

<template>
    <main class="container">
        <h1>Visuels pour les Talks</h1>

        <section class="section">
            <ChoosingTemplate />
            <ChoosingDate />
            <!-- <DatPicker2 /> -->
        </section>

        <section class="eventList">
            <h2>Liste des événements sélectionnés</h2>
            <EventArray />
        </section>

        <section class="section lastSection">
            <ValidateButton />
            <GenerateButton />
        </section>
        
    </main> 
</template>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }
    .section {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 50px;
    }

    h1 {
        font-family: 'Nunito', sans-serif;
        font-size: 48px;
        font-weight: 700;
        text-align: center;
    }

    .eventList {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(242, 242, 242, 0.4);
        border-radius: 20px;
    }

    .lastSection {
        margin-bottom: 50px;
    }
</style>
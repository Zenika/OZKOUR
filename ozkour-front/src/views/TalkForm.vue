<script>
import ChoosingTemplate from "../components/ChoosingTemplate.vue";
import ChoosingDate from "../components/ChoosingDate.vue";
import GenerateButton from "../components/Buttons/GenerateBtn.vue";
import EventArray from "../components/EventArray.vue";
import { useTalkStore } from "@/stores/talks";

export default {
  components: {
    ChoosingTemplate,
    ChoosingDate,
    GenerateButton,
    EventArray,
  },
  setup() {
    const talk = useTalkStore();
    return {
      talk,
    };
  },
};
</script>

<template>

  <main class="container">
    <div :class="{ blurClass: talk.blured }">
      <h1>Visuels pour les Talks</h1>
    </div>

    <section :class="{ blurClass: talk.blured , section:true}">
      <ChoosingTemplate />
      <ChoosingDate />
    </section>

    <section :class="{ blurClass: talk.blured ,eventList : true }">
      <EventArray/>
    </section>

    <section class="section lastSection">
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
  font-family: "Nunito", sans-serif;
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

.blurClass {
  -webkit-filter: blur(5px);
  filter: blur(5px);
}
</style>

<script>
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { ref } from 'vue';
    
    export default {
        components: { 
          Datepicker 
        },
        // data() {
        //     return {
        //         date: null,
        //     };
        // }
        setup() {
          const date = ref(new Date());
          
          return {
              date,
          }
      }
    }

    // const app = Vue.createApp({
    //     components: { Datepicker: VueDatePicker },
    // }).mount("#app");
</script>

<template>
  <Datepicker 
    v-model="date" 
    range 
    inline 
    autoApply 
    inlineWithInput 
    format="dd/MM/yyyy"
    locale="fr"
    calendarCellClassName="dp-custom-cell"
  > 
<!-- ajouter inlineWithInput  dans le Datepicker pour avoit un input date relié au calendrier -->
<!-- ajouter multiCalendars dans le Datepicker pour obtenir afficher le calendrier sur 2 mois -->
    <!-- <template clock-icon disabled></template> -->
  </Datepicker>
</template>

<style lang="scss">
.dp__range_end, .dp__range_start {
  background: #C01D67;
}
.dp__today {
  border: 1px solid #C01D67;
}
.dp__range_between {
  background: rgba(192, 29, 103, 0.25);
  color: #C01D67;;
}
</style>

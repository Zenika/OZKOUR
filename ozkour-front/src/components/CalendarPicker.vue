<script>
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { ref } from 'vue';
    
    export default {
        components: { 
          Datepicker 
        },
        setup() {
          const date = ref(new Date());
          
          return {
              date,
          }
      }
    }
</script>

<template>
  <Datepicker 
    v-model="date" 
    range 
    inline 
    autoApply 
    format="dd/MM/yyyy"
    locale="fr"
    calendarCellClassName="dp-custom-cell"
  > 
    <template #clear-icon="{ clear }">
        <img class="input-slot-image" src="" @click="clear" />
    </template>
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
  .dp__input_icons{
    width: 0px;
    height: 0px;
    padding: 0;
  }
  .dp__input_icon_pad{
    padding-left: 12px;
    width: 260px;
    // revoir la width 
  }
  .dp__button_bottom{
    visibility: hidden;
  }
</style>

<script>
import axios from "axios";
import qs from "qs";
import { ref, watch } from "vue";
import { useTalkStore } from "../stores/talks";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    Datepicker,
  },
  setup() {
    const date = ref(new Date());
    const dateStart = ref("2021-01-01");
    const dateEnd = ref("2021-01-11");
    date.value = [dateStart, dateEnd];
    
    const talks = useTalkStore();


    setInterval(function(){
        console.log("range date", date)
    },10000)

    watch(dateStart, async (newDate) => {
      console.log(newDate);
      axios
        .get("http://localhost:3000/talk", {
          params: {
            start: newDate,
            end: dateEnd.value,
          },
          paramsSerializer: (params) => qs.stringify(params, { encode: false }),
        })
        .then(function (response) {
          talks.updateTalks(response.data);
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });

    watch(dateEnd, async (newDate) => {
    // console.log(newDate);
      axios
        .get("http://localhost:3000/talk", {
          params: {
            start: dateStart.value,
            end: newDate,
          },
        })
        .then(function (response) {
          talks.updateTalks(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });

    return {
      date,
      talks,
      dateStart,
      dateEnd
    };
  },
};
</script>

<template>
  <div class="flex-column">
    <div class="date">
        <label for="start">Date de début</label>
        <input 
            type="date" 
            id="start" 
            name="talk-start" 
            v-model="dateStart" 
        />
    </div>

    <div class="date">
        <label for="end">Date de fin</label>
        <input
            type="date"
            id="end"
            name="talk-end"
            v-model="dateEnd"
            v-bind:min="dateStart"
        />
    </div>

    <button type="button" class="next-week-btn">Semaine prochaine</button>
  </div>
  <Datepicker
    v-model="date"
    range
    inline
    autoApply
    type="date"
    locale="fr"
    calendarCellClassName="dp-custom-cell"
  >
    <template #clear-icon="{ clear }">
      <img class="input-slot-image" src="" @click="clear" />
    </template>
  </Datepicker>
</template>

<style scoped>
    .flex-column {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    label,
    #start,
    #end {
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
        padding-bottom: 5px;
        font-weight: 400;
    }

    #start,
    #end {
        width: 80%;
        background: rgba(242, 242, 242, 0.4);
        color: #ffffff;
        letter-spacing: 0.1rem;
        display: flex;
        align-items: center;
        text-align: center;
        border: none;
        border-radius: 10px;
        padding: 10px;
        cursor: text;
    }

    .next-week-btn {
        background: #f2f2f2;
        font-weight: 400;
        font-size: 16px;
        border: 3px solid #ffffff;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
    }

    /* supprimer l'icon calendrier de l'input date */
    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
</style>

// Style du Calendrier "Datepicker"
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

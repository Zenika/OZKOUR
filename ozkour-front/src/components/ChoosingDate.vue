<script>
import axios from "axios";
import qs from "qs";
import dateFormat from "dateformat";
import { ref, watch } from "vue";
import { useTalkStore } from "../stores/talks";

import Datepicker from "@vuepic/vue-datepicker";

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

    date.value = [dateStart.value, dateEnd.value];

    function updateDateStartCalendar() {
      if (dateEnd.value < dateStart.value) dateStart.value = dateEnd.value;
      date.value[0] = dateStart.value;
    }

    function updateDateEndCalendar() {
      if (dateEnd.value < dateStart.value) dateEnd.value = dateStart.value;
      date.value[1] = dateEnd.value;
    }

    watch(date, async (newDate) => {
      dateStart.value = dateFormat(Date.parse(newDate[0]), "yyyy-mm-dd");
      dateEnd.value = dateFormat(Date.parse(newDate[1]), "yyyy-mm-dd");
      axios
        .get("http://localhost:3000/talk", {
          params: {
            start: dateStart.value,
            end: dateEnd.value,
          },
          paramsSerializer: (params) => qs.stringify(params, { encode: false }),
        })
        .then(function (response) {
          talks.updateTalks(response.data);
          let res = [];
          for (let i = 0; i < response.data.length; i++) {
            const talk = response.data[i];
            const value = {
              date: talk[4],
              universe: talk[3],
              eventType: talk[1],
              eventName: talk[2],
              talkTitle: talk[6],
              speakers: talk[5],
            };
            console.log(value)
            res.push(value);
          }

          talks.updateCheckedTalks(res);
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      talks.selectedDate(dateStart, dateEnd);
    });

    return {
      date,
      talks,
      dateStart,
      dateEnd,
      updateDateStartCalendar,
      updateDateEndCalendar,
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
        @change="updateDateStartCalendar"
      />
    </div>

    <div class="date">
      <label for="end">Date de fin</label>
      <input
        type="date"
        id="end"
        name="talk-end"
        v-model="dateEnd"
        @change="updateDateEndCalendar"
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
    data-test="test"
    format='yyyy-mm-dd'
    locale="fr"
    calendarCellClassName="dp-custom-cell"
    :monthChangeOnScroll="false" 
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
.dp__range_end,
.dp__range_start {
  background: #c01d67;
}
.dp__today {
  border: 1px solid #c01d67;
}
.dp__range_between {
  background: rgba(192, 29, 103, 0.25);
  color: #c01d67;
}
.dp__input_icons {
  width: 0px;
  height: 0px;
  padding: 0;
}
.dp__input_icon_pad {
  padding-left: 12px;
  width: 260px;
  // revoir la width
}
.dp__button_bottom {
  visibility: hidden;
}
</style>

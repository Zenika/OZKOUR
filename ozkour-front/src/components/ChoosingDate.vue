<script>
import dateFormat from "dateformat";
import { ref, watch } from "vue";
import { useTalkStore } from "../stores/talks";

import Datepicker from "@vuepic/vue-datepicker";

export default {
  components: {
    Datepicker,
  },
  emits: ['onSearchTalk'],
  setup(props, context) {
    const date = ref(new Date());
    const dateStart = ref(""); 
    const dateEnd = ref("");
    date.value = [dateStart, dateEnd];

    const talks = useTalkStore();

    date.value = [dateStart.value, dateEnd.value];

    talks.$subscribe((mutation, state) => {
      if(mutation.events.key === "template"){
        if (state.template.frequency === "week") {
          defaultDateNextWeek();
        } else if(state.template.frequency === "month"){
          defaultDateNextMonth();
        }
        updateDateStartCalendar();
        updateDateEndCalendar();
        searchTalk();
      }
    });

    function defaultDateNextMonth(d = new Date()) {
      if (d.getDate() < 7) {
        dateStart.value = dateFormat(Date.parse(d), "yyyy-mm-dd");
        dateEnd.value = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
          "yyyy-mm-dd"
        );
      } else {
        dateStart.value = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 1, 1)),
          "yyyy-mm-dd"
        );
        dateEnd.value = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 2, 0)),
          "yyyy-mm-dd"
        );
      }
    }

    function defaultDateNextWeek(d = new Date()) {
      if (d.getDay() !== 1) {
        console.log("c'est pas lundi");
        dateStart.value = dateFormat(
          Date.parse(
            new Date(d.getTime() + seekNextModay(d) * 24 * 60 * 60 * 1000)
          ),
          "yyyy-mm-dd"
        );
      } else {
        console.log("c'est lundi");
        dateStart.value = dateFormat(Date.parse(d), "yyyy-mm-dd");
      }
      //dateEnd.value =  dateFormat(Date.parse(new Date().getTime()), "yyyy-mm-dd");
      dateEnd.value = dateFormat(
        Date.parse(
          new Date(
            new Date(dateStart.value).getTime() + 6 * 24 * 60 * 60 * 1000
          )
        ),
        "yyyy-mm-dd"
      );
    }

    function seekNextModay(d = new Date()) {
      let n = 0;
      // while ((d.getDay() + n) % 7 !== 1) {
      //   n++;
      // }

      if(d.getDay()<1)
        n = 1-d.getDay()
      else
        n = 7 - d.getDay() + 1
      //console.log("prochain lundi dans " + n + " jours");
      return n;
    }

    function updateDateStartCalendar() {
      if (dateEnd.value < dateStart.value && dateEnd.value!=="") dateStart.value = dateEnd.value;
      date.value[0] = dateStart.value;
    }

    function updateDateEndCalendar() {
      if (dateEnd.value < dateStart.value && dateStart.value!=="") dateEnd.value = dateStart.value;
      date.value[1] = dateEnd.value;
    }

    function searchTalk() {
      context.emit('onSearchTalk', {dateStart, dateEnd});
    }

    watch(date, async (newDate) => {
      dateStart.value = dateFormat(Date.parse(newDate[0]), "yyyy-mm-dd");
      dateEnd.value = dateFormat(Date.parse(newDate[1]), "yyyy-mm-dd");
      searchTalk();
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
        id="start"
        v-model="dateStart"
        type="date"
        name="talk-start"
        @change="updateDateStartCalendar"
      >
    </div>

    <div class="date">
      <label for="end">Date de fin</label>
      <input
        id="end"
        v-model="dateEnd"
        type="date"
        name="talk-end"
        :min="dateStart"
        @change="updateDateEndCalendar"
      >
    </div>
  </div>
  <Datepicker
    v-model="date"
    range
    inline
    auto-apply
    data-test="test"
    format="yyyy-mm-dd"
    locale="fr"
    calendar-cell-class-name="dp-custom-cell"
    :month-change-on-scroll="false"
  >
    <template #clear-icon="{ clear }">
      <img
        class="input-slot-image"
        src=""
        @click="clear"
      >
    </template>
  </Datepicker>
</template>

<style lang="scss" scoped>

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  @include body;
  @include label;
}

#start,
#end {
  @include body;
  @include input;
}
</style>

<style lang="scss">

/* supprimer l'icon calendrier de l'input date */
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

// Calendar style
.dp__range_end,
.dp__range_start {
  background: $calendar-color
}
.dp__today {
  border: $calendar-border;
}
.dp__range_between {
  background: $calendar-bg-range;
  color: $calendar-color;
}
.dp__input_icons {
  width: 0px;
  height: 0px;
  padding: 0;
}
.dp__input_icon_pad {
  padding-left: 12px;
  width: 260px;
}
.dp__button_bottom {
  visibility: hidden;
}
</style>

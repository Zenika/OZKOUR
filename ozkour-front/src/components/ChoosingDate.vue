<script>
import dateFormat from 'dateformat'
import { ref } from 'vue'

import Datepicker from '@vuepic/vue-datepicker'

export default {
  components: {
    Datepicker
  },
  props: {
    chosenTemplate: {
      type: Object,
      required: true
    }
  },
  emits: ['onSearchEvent'],
  data () {
    const date = ref(new Date())
    const dateStart = ref()
    const dateEnd = ref()

    date.value = [dateStart.value, dateEnd.value]
    return {
      date,
      dateStart,
      dateEnd
    }
  },
  watch: {
    chosenTemplate: function (newTemplate) {
      if (newTemplate.frequency === 'week') {
        this.defaultDateNextWeek()
      } else if (newTemplate.frequency === 'month') {
        this.defaultDateNextMonth()
      }
      this.updateDateStartCalendar()
      this.updateDateEndCalendar()
      this.searchTalk()
    },
    date: function (newDate) {
      this.dateStart = dateFormat(Date.parse(newDate[0]), 'yyyy-mm-dd')
      this.dateEnd = dateFormat(Date.parse(newDate[1]), 'yyyy-mm-dd')
      this.searchTalk()
    }
  },
  methods: {
    defaultDateNextMonth (d = new Date()) {
      if (d.getDate() < 7) {
        this.dateStart = dateFormat(Date.parse(d), 'yyyy-mm-dd')
        this.dateEnd = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
          'yyyy-mm-dd'
        )
      } else {
        this.dateStart = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 1, 1)),
          'yyyy-mm-dd'
        )
        this.dateEnd = dateFormat(
          Date.parse(new Date(d.getFullYear(), d.getMonth() + 2, 0)),
          'yyyy-mm-dd'
        )
      }
    },
    defaultDateNextWeek (d = new Date()) {
      if (d.getDay() !== 1) {
        this.dateStart = dateFormat(
          Date.parse(
            new Date(d.getTime() + this.howManyDaysUntilNextMonday(d) * 24 * 60 * 60 * 1000)
          ),
          'yyyy-mm-dd'
        )
      } else {
        this.dateStart = dateFormat(Date.parse(d), 'yyyy-mm-dd')
      }
      this.dateEnd = dateFormat(
        Date.parse(
          new Date(
            new Date(this.dateStart).getTime() + 6 * 24 * 60 * 60 * 1000
          )
        ),
        'yyyy-mm-dd'
      )
    },
    updateDateEndCalendar () {
      if (this.dateEnd < this.dateStart && this.dateStart !== '') this.dateEnd = this.dateStart
      this.date[1] = this.dateEnd
    },
    updateDateStartCalendar () {
      if (this.dateEnd < this.dateStart && this.dateEnd !== '') this.dateStart = this.dateEnd
      this.date[0] = this.dateStart
    },
    howManyDaysUntilNextMonday (d = new Date()) {
      return d.getDay() === 0 ? 1 : 7 - d.getDay() + 1
    },
    searchTalk () {
      const dateStart = this.dateStart
      const dateEnd = this.dateEnd
      this.$emit('onSearchEvent', { dateStart, dateEnd })
    }
  }
}
</script>

<template>
  <div class="flex-column">
    <div class="date">
      <label for="start">Date de début</label>
      <input
        id="start"
        v-model="dateStart"
        type="date"
        name="event-start"
        @change="updateDateStartCalendar"
      >
    </div>

    <div class="date">
      <label for="end">Date de fin</label>
      <input
        id="end"
        v-model="dateEnd"
        type="date"
        name="event-end"
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

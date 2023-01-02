<script>
import Datepicker from '@vuepic/vue-datepicker'
import PeriodInput from './PeriodInput.vue'
import { DateTime } from 'luxon'

const defaultPeriod = {
  week: (period, date = DateTime.now()) => {
    const isNotMonday = date.weekday !== 1
    let start = period[0]
    let end = period[1]
    if (isNotMonday) {
      start = date.plus({ days: howManyDaysUntilNextMonday(date) }).toJSDate()
    } else {
      start = date.toJSDate()
    }
    end = DateTime.fromJSDate(start).plus({ days: 6 }).toJSDate()

    return [start, end]
  },
  month: (period, date = DateTime.now()) => {
    const isFirstWeekOfMonth = date.day <= 7
    let start = period[0]
    let end = period[1]
    if (isFirstWeekOfMonth) {
      start = date.toJSDate()
      end = date.endOf('month').toJSDate()
    } else {
      start = date.plus({ month: 1 }).startOf('month').toJSDate()
      end = date.plus({ month: 1 }).endOf('month').toJSDate()
    }
    return [start, end]
  }
}

function howManyDaysUntilNextMonday (date = DateTime.now()) {
  const isMonday = date.weekday === 1
  return isMonday ? 0 : 7 - date.weekday + 1
}

export default {
  components: {
    Datepicker,
    PeriodInput
  },
  props: {
    chosenTemplate: {
      type: Object,
      required: true
    }
  },
  emits: ['onSearchEvent'],
  data () {
    return {
      period: [new Date(), new Date()]
    }
  },
  watch: {
    chosenTemplate: function (newTemplate) {
      this.period = defaultPeriod[newTemplate.frequency](this.period)
    },
    period: function () {
      this.searchTalk()
    }
  },
  beforeMount () {
    this.period = defaultPeriod[this.chosenTemplate.frequency](this.period)
  },
  methods: {
    searchTalk () {
      const formatedDateStart = DateTime.fromJSDate(this.period[0]).toFormat('yyyy-MM-dd')
      const formatedDateEnd = DateTime.fromJSDate(this.period[1]).toFormat('yyyy-MM-dd')
      this.$emit('onSearchEvent', { dateStart: formatedDateStart, dateEnd: formatedDateEnd })
    },
    onChangePeriodInputs (newPeriod) {
      this.period = newPeriod
    }
  }
}
</script>

<template>
  <PeriodInput
    :period="period"
    @change="onChangePeriodInputs"
  />
  <Datepicker
    v-model="period"
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

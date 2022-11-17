<script>
import Datepicker from '@vuepic/vue-datepicker'
import DateInputContainer from './DateInputContainer.vue'

const defaultPeriod = {
  week: (period, date = new Date()) => {
    const isNotMonday = date.getDay() !== 1
    let start = period[0]
    let end = period[1]
    if (isNotMonday) {
      start = new Date(date.getTime() + howManyDaysUntilNextMonday(date) * 24 * 60 * 60 * 1000)
    } else {
      start = date
    }
    end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)

    return [start, end]
  },
  month: (period, date = new Date()) => {
    const isFirstWeekOfMonth = date.getDate() < 7
    let start = period[0]
    let end = period[1]
    if (isFirstWeekOfMonth) {
      start = date
      end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    } else {
      start =
          new Date(date.getFullYear(), date.getMonth() + 1, 1)
      end =
         new Date(date.getFullYear(), date.getMonth() + 2, 0)
    }
    return [start, end]
  }
}

function howManyDaysUntilNextMonday (d = new Date()) {
  const isSunday = d.getDay() === 0
  return isSunday ? 1 : 7 - d.getDay() + 1
}

export default {
  components: {
    Datepicker,
    DateInputContainer
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
      period: [new Date(), new Date()] // changer l'init
    }
  },
  watch: {
    chosenTemplate: function (newTemplate) {
      this.period = defaultPeriod[newTemplate.frequency](this.period)
      this.searchTalk()
    }
  },
  beforeMount () {
    this.period = defaultPeriod[this.chosenTemplate.frequency](this.period)
    this.searchTalk()
  },
  methods: {
    searchTalk () {
      this.$emit('onSearchEvent', { dateStart: this.period[0], dateEnd: this.period[1] })
    },
    onStartDateChange (date) {
      this.period = [date, this.period[1]]
    },
    onEndDateChange (date) {
      this.period = [this.period[0], date]
    },
    onChangePeriodInputs (newPeriod) {
      this.period = newPeriod
    }
  }
}
</script>

<template>
  <DateInputContainer
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

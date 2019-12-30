import Vue from 'vue'
import date from '~/services/date'

Vue.filter('toDate', (value) => {
  return date.toDate(value)
})

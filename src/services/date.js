import moment from 'moment'

export default {
  toDate (value) {
    if (!value) {
      return ''
    }
    return moment.unix(value.seconds).format('D MMM YYYY')
  }
}

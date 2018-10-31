/**
 * 日期转换
 */

class DateUtil {
  /**
   *格式化时间
   * @param  {Number} timeStamp  [时间戳]
   * @return {[刚刚, 几小时前, 几天前...]}           [description]
   */
  static formatDateAgo(timeStamp) {
    let now
    let oldTime
    let difference
    let result
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let date = new Date()

    now = date.getTime()
    if (typeof timeStamp === 'string' && timeStamp.indexOf('-') > 0) {
      timeStamp = timeStamp.replace(/-/g, '/')
      oldTime = date.setTime(timeStamp).getTime()
    } else {
      oldTime = timeStamp * 1000
    }
    difference = now - oldTime

    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute

    if (_year >= 1) {
      result = ~~_year + ' years ago'
    } else if (_month >= 1) {
      result = ~~_month + ' month ago'
    } else if (_week >= 2) {
      result = ~~_week + ' weeks ago'
    } else if (_week >= 2 && _week < 2) {
      result = ~~_week + ' week ago'
    } else if (_day >= 2) {
      result = ~~_day + ' days ago'
    } else if (_day >= 1 && _day < 2) {
      result = ~~_day + ' day ago'
    } else if (_hour >= 2) {
      result = ~~_hour + ' hours ago'
    } else if (_hour >= 1 && _hour < 2) {
      result = ~~_hour + ' hour ago'
    } else if (_min >= 2) {
      result = ~~_min + ' mins ago'
    } else if (_min >= 1 && _min < 2) {
      result = ~~_min + ' min ago'
    } else {
      result = ' Just now'
    }

    return result
  }

  /**
   * 月份匹配
   * @param {*} m
   */
  static switchMonth(m) {
    switch (m) {
      case 1:
        return 'January'
      case 2:
        return 'February'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'June'
      case 7:
        return 'July'
      case 8:
        return 'August'
      case 9:
        return 'September'
      case 10:
        return 'October'
      case 11:
        return 'November'
      case 12:
        return 'December'
      default:
        break
    }
  }

  /**
   * 格式化时间如：July 14 at 5:37 PM
   * @param  {Number} timestamp [description]
   * @param  {Number} formater  [description]
   * @return {String} [July 14 at 5:37 PM]
   */
  static onDate(timestamp) {
    let now = new Date()
    // now.setTime(parseInt(timestamp * 1000))
    now.setTime(parseInt(timestamp))
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    let d = now.getDate()
    let h = now.getHours()
    let mm = now.getMinutes()
    let s = now.getSeconds()
    let str

    if (h > 12) {
      h -= 12
      str = ' PM'
    } else {
      str = ' AM'
    }

    // d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    // m = m < 10 ? '0' + m : m
    mm = mm < 10 ? '0' + mm : mm
    // s = s < 10 ? '0' + s : s

    let xy = `${y} ${this.switchMonth(m)} ${d} at ${h}:${mm}:${s} ${str}`
    return xy
  }
}

export default DateUtil

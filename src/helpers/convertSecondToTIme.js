/**
 *
 * @param {number}  time time in seconds
 * @param {boolean}  twoNumberForMintes if you want two number for minutes
 * @return {string}
 */
function convertSecondsToTime(time, twoNumberForMintes = false) {
  if (Number.isNaN(time)) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes > 9 && twoNumberForMintes ? `0${minutes}` : minutes}:${seconds > 9 ? seconds : `0${seconds}`}`
}

export default convertSecondsToTime

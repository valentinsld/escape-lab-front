/**
 *
 * @param {number}  time time in seconds
 * @param {boolean}  twoNumberForMintes if you want two number for minutes
 * @return {string}
 */
function convertSecondsToTime(time, twoNumberForMintes = false) {
  if (Number.isNaN(time)) return '0:00'
  const pad = twoNumberForMintes ? 2 : 1

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(pad, '0')
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(pad, '0')
  return `${minutes}:${seconds}`
}

export default convertSecondsToTime

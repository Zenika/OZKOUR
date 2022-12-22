
function sortArrayByKeyAndOrder (arrayOfObject, key, isAscending) {
  if (isAscending) {
    return arrayOfObject.sort((a, b) => compareByKey(a, b, key))
  }
  return arrayOfObject.sort((b, a) => compareByKey(a, b, key))
}

function compareByKey (a, b, key) {
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  // a must be equal to b
  return 0
}

module.exports = {
  sortArrayByKeyAndOrder,
  compareByKey
}

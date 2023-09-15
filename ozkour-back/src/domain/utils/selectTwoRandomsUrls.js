function selectTwoRandomsUrls (arrayOfUrls) {
  if (Array.isArray(arrayOfUrls)) {
    const shuffled = arrayOfUrls.sort(() => 0.5 - Math.random())
    const arrayOfTwoObjects = shuffled.slice(0, 2)
    return arrayOfTwoObjects.map((obj) => obj.thumbnailLink)
  } else {
    return []
  }
}

module.exports = {
  selectTwoRandomsUrls
}

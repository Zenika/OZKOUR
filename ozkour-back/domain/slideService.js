const slide = require('../infrastructure/googleslide/slide')
const slideDataOrganizer = require('./slideDataOrganizer')

// Fonction pour créer les slides
async function createSlides (talks) {
  if (!verifyTalks(talks)) {
    console.log('error')
    throw (new Error('error : wrong format'))
  }
  const dataOrganizedBySlide = slideDataOrganizer.clusterByDate(talks)
  const idTemplate = await slide.getIdSlideTemplate()
  const unorderedPromises = []
  for (const dataOrganized of dataOrganizedBySlide) {
    const newIdPage = await copySlide(idTemplate)
    unorderedPromises.push(deleteTemplateInfo(newIdPage).then(() => addTableData(newIdPage, dataOrganized)).catch(e => console.log(e)))
  }
  await Promise.all(unorderedPromises)
  return slide.getSuccessMessage()
}

function verifyTalks (talks) {
  if (!Array.isArray(talks) || talks.length <= 0) {
    return false
  }
  return talks.some(
    ({ date, eventType, eventName, talkTitle, speakers }) =>
      Boolean(date) &&
        Boolean(eventType) &&
        Boolean(eventName) &&
        Boolean(talkTitle) &&
        Boolean(speakers)
  )
}

// Fonction pour copier un slide
async function copySlide (idPage) {
  return await slide.copySlide(idPage)
}

// Fonction pour supprimer des éléments du template
async function deleteTemplateInfo (idPage) {
  return await slide.deleteTemplateInfo(idPage)
}

// Fonction pour ajouter des données
async function addTableData (idPage, data) {
  return await slide.fillSlideWithData(idPage, data)
}

// une fonction pour récupérer les données des slides (à voir)

module.exports = {
  deleteTemplateInfo,
  addTableData,
  copySlide,
  verifyTalks,
  createSlides
}

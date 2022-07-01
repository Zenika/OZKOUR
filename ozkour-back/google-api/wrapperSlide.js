const slide = require('./slide')
const slideDataOrganizer = require('./slideDataOrganizer')

async function createSlideFromTalks (talks, h) {
  try {
    const res = await createSlides(talks)
    return h.response(res).code(200)
  } catch (e) {
    return h.response(e).code(500)
  }
}

// Fonction pour créer les slides
async function createSlides (talks) {
  const promiseSlideCreated = new Promise((resolve, reject) => {
    if (verifyTalks(talks)) {
      const dataOrganizedBySlide = slideDataOrganizer.clusterByDate(talks)
      dataOrganizedBySlide.forEach(async (dataOrganized) => {
        try {
          const newIdPage = await copySlide(await slide.getIdSlideTemplate())
          await deleteTemplateInfo(newIdPage)
          await addTableData(newIdPage, dataOrganized)
          resolve(slide.getSuccessMessage())
        } catch (e) {
          reject(e)
        }
      })
    } else {
      reject(new Error('error : wrong format'))
    }
  })
  return promiseSlideCreated
}

// Fonction pour vérifier les talks
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
  return await slide.addTableData(idPage, data)
}

// une fonction pour récupérer les données des slides (à voir)

module.exports = {
  createSlideFromTalks,
  deleteTemplateInfo,
  addTableData,
  copySlide,
  verifyTalks,
  createSlides
}

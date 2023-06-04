const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const {logger} = require("../logger")
dayjs.extend(customParseFormat)
const sheetsWrapper = require('../infrastructure/googlesheets/sheetWrapper')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const { CustomeError } = require('../Error/customeError')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const INDEX_COMPLET_TRAINING = 0;

const getTraining = async (start, end, auth) => {
  try {
    const formatedDateStart = dayjs(start).format('DD/MM/YYYY')
    const formatedDateEnd = dayjs(end).format('DD/MM/YYYY')

   const validateDateStart = dayjs(formatedDateStart,'DD/MM/YYYY', true).isValid()
   const validateEndStart = dayjs(formatedDateEnd,'DD/MM/YYYY', true).isValid()

   if(!validateDateStart || !validateEndStart) {
    throw new CustomeError("Erreur pendant la transformation des dates", 500)
  } 
   else{
    logger.verbose({message : "transformation des dates OK!"})
    const training = await sheetsWrapper.getTrainings(auth)
    return dateFilter(verifyedCompletetData(training), formatedDateStart, formatedDateEnd)
   } 
  } catch (error) {
    logger.error({message : error.message})
    throw error
  }}

function dateFilter (trainings, formatedDateStart, formatedDateEnd) {

const startDate = dayjs(formatedDateStart, 'DD/MM/YYYY')
const endDate = dayjs(formatedDateEnd, 'DD/MM/YYYY')

const completTrainingNotFiltered = trainings[INDEX_COMPLET_TRAINING]

const  completTrainingsFiltered = completTrainingNotFiltered.filter((el)=>{
    const formationDate = dayjs(el.date, 'DD/MM/YYYY')
    return formationDate.isSameOrAfter(startDate, 'day') && formationDate.isSameOrBefore(endDate, 'day')
  })
  
  return [completTrainingsFiltered, trainings[1]]
}

function verifyedCompletetData (array){
const incompletArrayOfData = []
const completArrayOfData = []
array.forEach((el)=>{
completArrayOfData.push(el)
if(!el.trainingTitle || !el.universe || !el.duration || !el.price || !el.link || !el.date ) {
incompletArrayOfData.push(el.indexLine)
}
})
return [
  completArrayOfData,
  incompletArrayOfData
]
}

module.exports = {
  getTraining,
  dateFilter
}

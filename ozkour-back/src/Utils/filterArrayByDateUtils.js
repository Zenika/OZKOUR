const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function dateFilter (arrayOfTrainingOrTlaks, formatedDateStart, formatedDateEnd) {

	const INDEX_COMPLET_TALK_OR_FORMATION = 0;

	const startDate = dayjs(formatedDateStart, 'DD/MM/YYYY')
	const endDate = dayjs(formatedDateEnd, 'DD/MM/YYYY')
	
	const completarrayOfTrainingOrTlaksgNotFiltered = arrayOfTrainingOrTlaks[INDEX_COMPLET_TALK_OR_FORMATION]
	
	const  completTrainingOrTlaksFiltered = completarrayOfTrainingOrTlaksgNotFiltered.filter((el)=>{
		console.log(el.date)
		const formationDate = dayjs(el.date, 'DD/MM/YYYY')
		console.log(formationDate.isSameOrAfter(startDate, 'day') && formationDate.isSameOrBefore(endDate, 'day'))
		return formationDate.isSameOrAfter(startDate, 'day') && formationDate.isSameOrBefore(endDate, 'day')
	  })
	  
	  return [completTrainingOrTlaksFiltered, arrayOfTrainingOrTlaks[1]]
	}

	module.exports = {
		dateFilter
	}


function verifyedCompletetData (array, variables){
const TRAINING_SHEET_CONST = "training_sheet"
const TALK_SHEET_CONST = "talk_sheet"
const incompletArrayOfData = []
const completArrayOfData = []

if(variables === TRAINING_SHEET_CONST){
	array.forEach((el)=>{
	completArrayOfData.push(el)
	if(!el.title || !el.universe || !el.duration || !el.price || !el.url  || !el.date ) {
	incompletArrayOfData.push(el.indexLine)
	}
})
}

if(variables === TALK_SHEET_CONST){
	if(!el.date || !el.universe || !el.eventType || !el.eventName || !el.talkTitle  || !el.speakers || !el.url ) {
	 incompletArrayOfData.push(el.indexLine)
	}
}

return [
	completArrayOfData,
	incompletArrayOfData
  ]
}

module.exports = {
	verifyedCompletetData,
  }
  
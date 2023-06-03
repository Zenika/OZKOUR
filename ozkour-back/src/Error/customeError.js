class Error {
	constructor(message) {
	  this.message = message;
	  this.name = "Error"; 
	}
  }

class CustomeError extends Error{
	constructor(message, status){
		super(message);
		this.name = "Erreur";
		this.status = status;
	}
}

const sendCustomError = (error, h)=>{
	const status = error.status
	switch (status) {
	  case 400 :
	   return  h.response({
		  status : status,
		  message : error.message
		}).code(status)
	  case 401 :
		return  h.response({
		  status : status,
		  message : error.message
		}).code(status)
	  case 404 :
		return  h.response({
		 status : status,
		 message : error.message
	   }).code(status)
	 default :
	 logger.verbose({message : "erreur"});
	}
}

module.exports = {
	CustomeError,
	sendCustomError,
}
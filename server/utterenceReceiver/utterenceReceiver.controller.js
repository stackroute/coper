const processUtterence = function(utterance)
{
	// const utterance = {
	// 	text: '',
	// 	timestamp: null,
	// 	token : '',
	// 	context : ''
	// }
	if(utterance.timestamp === null )
	{
		let date = new Date();
		utterance.timestamp = date.toUTCString();
		utterance.context = getContext(utterance.text);//attach context
		//save utterence in db


		utterence.save(function(err) {
                if (err)
                    return done(err);
                return done(null,utterence);
            });
		return utterance;
	}
	else
	{
		let tempContext = getContext(utterance.text);
		if(utterance.context !== tempContext)
		{
			let date = new Date();
			utterance.timestamp = date.toUTCString();
			utterance.context = tempContext;
		}
		return utterance;
	}

}
module.exports =  processUtterence;

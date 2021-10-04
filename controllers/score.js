const handleScore = (req, res, db) => {
	const { name } = req.body;
	db('highscores')
	.returning('*')
	.orderBy('score', 'desc')
	.limit(10)
	.then(data => {
		res.json(data)
	})
}

const updateScore = (req, res, db) => {
	const { name, score } = req.body;
	db('highscores')
	.returning('*')
	.insert({
	name: name,
	score: score
	})
	.then(data => {
		res.json(data[0])
	})
	.catch(err => res.status(400).json('unable to update'))
}

const deleteScore = (req, res, db) => {
	const { name} = req.body;
	db('highscores')
	.returning('*')
	.where({name})
  	.del()
  	.then(data => {res.json(data)})
	.catch(err => res.status(400).json('unable to update'))
}


module.exports = {
	handleScore: handleScore,
	updateScore: updateScore,
	deleteScore: deleteScore
}
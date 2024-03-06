const jwt = require('jsonwebtoken');
const verify = (req,res,next) => {
	const authHeader = req.headers['authorization'];
	console.log("a/uth heade/rs--------------------"+authHeader.split(' ')[1])
    const token = authHeader && authHeader.split(' ')[1];

	 if (!token) {
	    return res.sendStatus(401);
	  }
	  const result = jwt.verify(req.body.token, '@#$123^^^^');
	  console.log('----reult--------------'+JSON.stringify(result));
	  if (!result.success) {
	    return res.status(403).json({ error: result.error });
	  }
	  req.user = result.data;
	  next()
}
module.exports = verify;
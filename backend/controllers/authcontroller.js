const bccrypt = require('bcryptjs');
const Auth = require('../models/Auth.js')
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
	try{
		const emailres =  await Auth.findOne({ email:req.body.email });
		if( emailres ){
			res.json({'msg':'This user is already exists.'})
		}
		else{
			const saltPassword  = bccrypt.genSaltSync(12)
			const encrytpass    = bccrypt.hashSync(req.body.password,saltPassword)
			const authdata      = new Auth({'name':req.body.name,'email':req.body.email,'password':encrytpass,'status':req.body.status})
			const saveresponse  = authdata.save()
			res.json({'saveresponse':saveresponse})
		}
	}
	catch(err)
	{
		res.json({'err':err})
	}
}
const login = async (req,res)=> {
	try{
		const emailres =  await Auth.findOne({ email:req.body.email });
		console.log(emailres)
			if( emailres )
			{
				console.log(emailres)
				bccrypt.compare( req.body.password, emailres.password,function(err, resonse) {
				if(resonse)
				{

					const token = jwt.sign({ userId: emailres._id }, '@#$123^^^^', {
					 expiresIn: '1h',
 					});
				res.json({'message':'email and  password are  match','token':token})
				}
				else{
				res.json({ msg: "Login fai/l/" })
				}

				})
			}
			else{	
				res.json({'message':'email and  password are  match'})	
			}
	}
	catch(err)
	{
		res.json({'error':err});
	}
}
module.exports = { register ,login }
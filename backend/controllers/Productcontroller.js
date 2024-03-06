const UserModel = require('../models/User');

const Adduser = async (req, res) => {
    try {
        const product = new UserModel({'email':req.body.email,'firstName':req.body.firstName,'lastName':req.body.lastName,'phone':req.body.phone})
        await product.save();
        res.status(200).json({'message':'save successfully..'});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
const  Edituser = async(req,res) => {
    try{
        const Editdata = await UserModel.findById({ '_id': req.body.id })
        console.log(Editdata);
       res.status(200).json({'datae':Editdata})
    }catch(error){
        res.status(404).json({message:error.messgae})
    }
};
const  Updateuser = async(req,res) => {
    try{
        const updateDAta = {'email':req.body.email,'firstName':req.body.firstname,'lastName':req.body.Lastname,'phone':req.body.phone}
         await UserModel.findByIdAndUpdate({'_id': req.body.id}, updateDAta, {new: true}); 
        res.status(200).json({'datae':'update successfully'})
    }catch(error){
        console.log('errrororro')
        res.status(404).json({'error':error})
    }
};
const  fetchuser = async(req,res) => {
    try{
        console.log('pageNumber'+req.query.currentPage)
        const pageSize = 2;
        const pageNumber = req.query.currentPage || 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const Updatedata = await UserModel.find()
        const users = Updatedata.slice(startIndex, endIndex);

        res.json({ 'datae':users, 'total': Updatedata.length });
    }catch(error){
        res.status(404).json({message:error.messgae})
    }
};
const Deleteuser = async (req,res)=>{
    try{
        const id = req.body.id
        console.log(id);
        const delteuser = await UserModel.findByIdAndDelete(id)
        return res.json({'Deluser':delteuser})
        
    }catch(error)
    {
        res.status(404).json({'err':error})
    }
}
module.exports = {Adduser,Edituser,Updateuser,fetchuser,Deleteuser}
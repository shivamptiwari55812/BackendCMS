require('dotenv').config();
const {validationResult} = require('express-validator');
const signUp = async(req,res)=>{
    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {adminUsername , adminPassword} = req.body;
    if(!adminUsername || !adminPassword){
        res.status(404).json({"message":'Enter all the required fields'})
    }

}

module.exports = {
    signUp,
}


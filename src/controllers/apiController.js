const User = require('../models/user');
const {uploadSingleFile, uploadMultiFile} = require('../services/fileService');


module.exports = {
    // postCreateUserAPI: async (req, res) => {
    //     let {email, name, city} = req.body;

    //     let user = await User.create({
    //         email: email,
    //         name: name,
    //         city: city
    //     });
    //     return res.status(200).json({
    //         EC: 0,
    //         data: user
    //     })
    // },

    postUploadSingleFileAPI: async (req, res) => {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No files were uploaded.');
        }

        let result = await uploadSingleFile(req.files.image);
        console.log('result: ', result);
        return res.send('ok single');
    },

    postUploadMultipleFileAPI: async (req, res) => {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No files were uploaded.');
        }
        //console.log(req.files);
        //upload single => fies is an object
        //upload multilple => files is an array
        if(Array.isArray(req.files.image)){
            //upload multiple
            let result = await uploadMultiFile(req.files.image);
            return res.status(200).json({
                EC: 0,
                data: result
            })
        } else {
            //upload single 
            return await postUploadSingleFileAPI(req, res);
        }
    }
}
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : function (req , file , cb) {
        cb( null , 'uploads')
    },
    filename : function(req,file , cb){
        // let ext = path.extname(file.originalname)
        // cb(null , Date.now() + ext)
        cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage : storage 
})

module.exports = upload